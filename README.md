# 🫀 PulseGuard Sentinel: Heart Disease Prediction

> **A high-fidelity machine learning platform performing cardiovascular risk assessment using production-grade classification engines.**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.x-009688?logo=fastapi&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-2.x-006400)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Backend-131415?logo=railway&logoColor=white)

---

## 📋 Project Overview

PulseGuard Sentinel is a full-stack AI application that predicts heart disease probability based on clinical biometrics. It transitions from raw research (Jupyter) to a modular production system featuring a **high-fidelity medical telemetry dashboard**.

### 🏗️ Evolution Pipeline
1. **Research Phase**: EDA and feature engineering in [Jupyter](heart-disease.ipynb).
2. **Modularization**: Refactoring code into clean, testable Python modules.
3. **API Integration**: Serving the XGBoost model via [FastAPI](src/api.py).
4. **Front-End Design**: A "Cyber-Medical" dashboard built with [React & Framer Motion](frontend/).

---

## 🛠️ Tech Stack

### AI & Backend
- **Data Engine:** [Polars](https://pola.rs/) (High-performance DataFrame library)
- **ML Framework:** [scikit-learn](https://scikit-learn.org/) & [XGBoost](https://xgboost.ai/)
- **Inference Server:** [FastAPI](https://fastapi.tiangolo.com/) + Pydantic Validation
- **Serialization:** Joblib for efficient model persistence

### UI & Frontend (PulseGuard Sentinel)
- **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) (Smooth state transitions & telemetry scanner)
- **Design System:** Custom Medical-Tech UI with Glassmorphism & SVG Telemetry Gauges
- **Icons:** [Lucide-React](https://lucide.dev/)

---

## 🚀 Deployment Strategy

| Component | Platform | URL |
|-----------|----------|-----|
| **Frontend** | [Vercel](https://vercel.com) | https://heart-disease-prediction-ui.vercel.app |
| **Microservice** | [Railway](https://railway.app) | https://heart-api.up.railway.app |

---

## 🖥️ Getting Started

### 1. Local Development (Backend)
```bash
# Install dependencies (Conda)
conda env create -f environment.yml
conda activate heart-disease-env

# Start Inference Server
fastapi dev src/api.py
```

### 2. Local Development (Frontend)
```bash
cd frontend
npm install
npm run dev
```
*The UI will be available at `http://localhost:5173`.*

---

## 📂 Project Structure

```
heart-disease-prediction/
├── frontend/                 # React + Vite Dashboard
│   ├── src/                  # PulseGuard Sentinel source
│   └── package.json          # UI dependencies
├── src/                      # Backend Microservice
│   ├── api.py                # FastAPI web server
│   ├── schemas.py            # Pydantic schemas
│   └── ...                   # ML Data Loaders & Preprocessing
├── models/                   # Serialized XGBoost (.joblib)
├── train.py                  # CLI training script
├── environment.yml           # Conda env config
├── heart-disease.ipynb       # Research notebook
└── README.md                 # Documentation
```

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ to push the boundaries of AI & UX.*
