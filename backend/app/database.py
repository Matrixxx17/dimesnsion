from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = "postgresql://dashboardmonitoring_user:8TQGURFmv2YW2FLBpCJoJcjb5FjKzbI1@dpg-d0117a24d50c73cog4bg-a.virginia-postgres.render.com/dashboardmonitoring"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
