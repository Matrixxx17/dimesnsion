from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import func
from datetime import datetime, timedelta
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/{server_id}", response_model=List[schemas.Metric])
def get_server_metrics(
    server_id: int, 
    days: int = 1,
    db: Session = Depends(get_db)
):
    time_threshold = datetime.utcnow() - timedelta(days=days)
    metrics = db.query(models.ServerMetric).filter(
        models.ServerMetric.server_id == server_id,
        models.ServerMetric.timestamp >= time_threshold
    ).order_by(models.ServerMetric.timestamp.asc()).all()
    
    return metrics

@router.get("/usage/average", response_model=dict)
def get_average_usage(db: Session = Depends(get_db)):
    """Get average CPU, RAM, Disk and App usage across all servers"""
    time_threshold = datetime.utcnow() - timedelta(days=1)
    
    result = db.query(
        func.avg(models.ServerMetric.cpu_usage).label("avg_cpu"),
        func.avg(models.ServerMetric.ram_usage).label("avg_ram"),
        func.avg(models.ServerMetric.disk_usage).label("avg_disk"),
        func.avg(models.ServerMetric.app_usage).label("avg_app")
    ).filter(models.ServerMetric.timestamp >= time_threshold).first()
    
    return {
        "avg_cpu": float(result.avg_cpu or 0),
        "avg_ram": float(result.avg_ram or 0),
        "avg_disk": float(result.avg_disk or 0),
        "avg_app": float(result.avg_app or 0)
    }

@router.get("/network/traffic", response_model=List[dict])
def get_network_traffic(days: int = 1, db: Session = Depends(get_db)):
    """Get network traffic data for all servers"""
    time_threshold = datetime.utcnow() - timedelta(days=days)
    
    metrics = db.query(
        models.ServerMetric.timestamp, 
        models.ServerMetric.network_traffic,
        models.Server.name.label("server_name")
    ).join(
        models.Server, 
        models.ServerMetric.server_id == models.Server.id
    ).filter(
        models.ServerMetric.timestamp >= time_threshold
    ).order_by(
        models.ServerMetric.timestamp.asc()
    ).all()
    
    return [
        {
            "timestamp": m.timestamp.isoformat(),
            "network_traffic": m.network_traffic,
            "server_name": m.server_name
        } 
        for m in metrics
    ]