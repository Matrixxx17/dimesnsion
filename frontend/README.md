# Server Monitoring Dashboard

A comprehensive dashboard for monitoring server metrics, alerts, and performance.

## Features

- Display counts of critical, medium, and low alerts
- Visualize CPU, RAM, disk, and application usage through charts
- Monitor server incoming network traffic
- View and manage server information

## Tech Stack

- **Backend**: Python (FastAPI)
- **Frontend**: React JS with Recharts for visualization
- **Database**: PostgreSQL

## Project Structure

- `backend/`: FastAPI backend application
- `frontend/`: React frontend application

## Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Configure the database:
   Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL=postgresql://username:password@localhost/server_monitoring
   ```
   Replace `username`, `password` with your PostgreSQL credentials.

5. Run the backend server:
   ```
   uvicorn app.main:app --reload
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

   The application will be available at http://localhost:3000

## Database Integration

The application is configured to connect to a PostgreSQL database. You need to:

1. Create a PostgreSQL database named `server_monitoring`
2. Update the database connection string in `backend/app/database.py` or set the `DATABASE_URL` environment variable
3. When the application starts for the first time, it will create the necessary tables
4. Use the "Seed Mock Data" button in the UI to populate the database with sample data

## API Documentation

Once the backend is running, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## License

MIT