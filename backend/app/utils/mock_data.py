import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from faker import Faker
from app.models import Server, ServerMetric, Alert, AlertSeverity

fake = Faker()

def generate_mock_servers(db: Session, count: int = 10):
    """Generate mock server data"""
    servers = []
    for _ in range(count):
        server = Server(
            name=f"srv-{fake.word()}-{random.randint(1, 999)}",
            ip_address=fake.ipv4(),
            location=fake.city(),
            status=random.choice(["online", "offline", "maintenance"])
        )
        db.add(server)
        servers.append(server)
    
    db.commit()
    return servers

def generate_mock_metrics(db: Session, servers, days: int = 7, interval_hours: int = 1):
    """Generate mock metrics data for servers"""
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    current_date = start_date
    while current_date <= end_date:
        for server in servers:
            metric = ServerMetric(
                server_id=server.id,
                cpu_usage=random.uniform(5, 95),
                ram_usage=random.uniform(10, 90),
                disk_usage=random.uniform(20, 85),
                app_usage=random.uniform(5, 80),
                network_traffic=random.uniform(10, 5000),
                timestamp=current_date
            )
            db.add(metric)
        
        current_date += timedelta(hours=interval_hours)
    
    db.commit()

def generate_mock_alerts(db: Session, servers, count: int = 50):
    """Generate mock alerts data"""
    severities = [AlertSeverity.CRITICAL, AlertSeverity.MEDIUM, AlertSeverity.LOW]
    messages = [
        "CPU usage exceeded 90%",
        "Memory usage critically high",
        "Disk space running low",
        "Network traffic spike detected",
        "Service unavailable",
        "Database connection failed",
        "High latency detected",
        "SSL certificate expiring soon",
        "Application error rate increased",
        "Unusual traffic pattern detected"
    ]
    
    for _ in range(count):
        server = random.choice(servers)
        severity = random.choice(severities)
        message = random.choice(messages)
        timestamp = datetime.utcnow() - timedelta(
            hours=random.randint(0, 24 * 7)
        )
        resolved = random.randint(0, 1)
        
        alert = Alert(
            server_id=server.id,
            severity=severity,
            message=message,
            timestamp=timestamp,
            resolved=resolved
        )
        db.add(alert)
    
    db.commit()

def populate_mock_data(db: Session):
    """Populate database with mock data"""
    servers = generate_mock_servers(db, count=10)
    generate_mock_metrics(db, servers, days=7)
    generate_mock_alerts(db, servers, count=50)
