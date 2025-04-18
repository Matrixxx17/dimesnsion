from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import func
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/alerts", tags=["alerts"])

@router.get("/", response_model=List[schemas.Alert])
def get_alerts(
    skip: int = 0, 
    limit: int = 100, 
    resolved: int = None,
    severity: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Alert)
    
    if resolved is not None:
        query = query.filter(models.Alert.resolved == resolved)
    
    if severity:
        query = query.filter(models.Alert.severity == severity)
    
    return query.order_by(models.Alert.timestamp.desc()).offset(skip).limit(limit).all()

@router.get("/count", response_model=schemas.AlertCountResponse)
def get_alert_counts(db: Session = Depends(get_db)):
    """Get counts of alerts by severity"""
    critical_count = db.query(func.count(models.Alert.id)).filter(
        models.Alert.severity == models.AlertSeverity.CRITICAL,
        models.Alert.resolved == 0
    ).scalar()
    
    medium_count = db.query(func.count(models.Alert.id)).filter(
        models.Alert.severity == models.AlertSeverity.MEDIUM,
        models.Alert.resolved == 0
    ).scalar()
    
    low_count = db.query(func.count(models.Alert.id)).filter(
        models.Alert.severity == models.AlertSeverity.LOW,
        models.Alert.resolved == 0
    ).scalar()
    
    total_count = critical_count + medium_count + low_count
    
    return {
        "critical": critical_count,
        "medium": medium_count,
        "low": low_count,
        "total": total_count
    }

@router.post("/{alert_id}/resolve", response_model=schemas.Alert)
def resolve_alert(alert_id: int, db: Session = Depends(get_db)):
    """Mark an alert as resolved"""
    alert = db.query(models.Alert).filter(models.Alert.id == alert_id).first()
    if alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    alert.resolved = 1
    db.commit()
    db.refresh(alert)
    return alert