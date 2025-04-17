from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import get_db, engine
from . import models
from .routers import servers, metrics, alerts
from .utils.mock_data import populate_mock_data

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Server Monitoring API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify the exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(servers.router)
app.include_router(metrics.router)
app.include_router(alerts.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Server Monitoring API"}

@app.post("/seed-data")
def seed_data(db: Session = Depends(get_db)):
    """Endpoint to seed the database with mock data"""
    populate_mock_data(db)
    return {"message": "Database seeded with mock data"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)