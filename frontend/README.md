# PulseGuard AI Frontend

This is a premium React-based dashboard for the Heart Disease Prediction API.

## Features
- **XGBOOST Inference**: Real-time integration with the Python backend.
- **Glassmorphic UI**: High-fidelity medical telemetry aesthetic.
- **Framer Motion**: Smooth state transitions and animations.
- **Responsive**: Works on desktop and mobile.

## How to Run

### 1. Start the Backend
Navigate to the root and run:
```bash
# Make sure you have the dependencies installed
uvicorn src.api:app --reload
```

### 2. Start the Frontend
Navigate to this directory and run:
```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.
It is configured to proxy `/api` requests to `http://localhost:8000`.
