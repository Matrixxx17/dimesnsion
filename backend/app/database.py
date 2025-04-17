from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# TODO: Replace with your PostgreSQL connection string
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Rohan@0017@localhost/dimensionless_servermonitoring"
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Rohan%400017@localhost/dimensionless_servermonitoring"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()