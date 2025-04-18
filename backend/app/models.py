from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from .database import Base

class AlertSeverity(str, enum.Enum):
    CRITICAL = "critical"
    MEDIUM = "medium"
    LOW = "low"

class Server(Base):
    __tablename__ = "servers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    ip_address = Column(String)
    location = Column(String)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    metrics = relationship("ServerMetric", back_populates="server")
    alerts = relationship("Alert", back_populates="server")

class ServerMetric(Base):
    __tablename__ = "server_metrics"

    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    cpu_usage = Column(Float)
    ram_usage = Column(Float)
    disk_usage = Column(Float)
    app_usage = Column(Float)
    network_traffic = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    server = relationship("Server", back_populates="metrics")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    severity = Column(Enum(AlertSeverity))
    message = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    resolved = Column(Integer, default=0)  # 0 for unresolved, 1 for resolved
    
    server = relationship("Server", back_populates="alerts")