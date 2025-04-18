from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .models import AlertSeverity

class ServerBase(BaseModel):
    name: str
    ip_address: str
    location: str
    status: str

class ServerCreate(ServerBase):
    pass

class Server(ServerBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class MetricBase(BaseModel):
    server_id: int
    cpu_usage: float
    ram_usage: float
    disk_usage: float
    app_usage: float
    network_traffic: float
    timestamp: datetime

class MetricCreate(MetricBase):
    pass

class Metric(MetricBase):
    id: int

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    server_id: int
    severity: AlertSeverity
    message: str
    timestamp: datetime
    resolved: int

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int

    class Config:
        from_attributes = True

class AlertCountResponse(BaseModel):
    critical: int
    medium: int
    low: int
    total: int