import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
import polars as pl

from src.models import load_model
from src.preprocessing import apply_mappings
from src.schemas import HeartDiseaseInput, PredictionResponse

# loaded model
ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the machine learning model
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "heart_disease_model.joblib")
    if os.path.exists(model_path):
        ml_models["pipeline"] = load_model(model_path)
        print(f"Model loaded successfully from {model_path}")
    else:
        print(f"Warning: Model not found at {model_path}. Please run train.py first.")

    yield

    ml_models.clear()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Heart Disease Prediction API",
    description="A FastAPI backend for predicting heart disease using an XGBoost model.",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you should specify the Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Heart Disease Prediction API is running!"}

@app.post("/predict", response_model=PredictionResponse)
def predict_heart_disease(input_data: HeartDiseaseInput):
    if "pipeline" not in ml_models:
        raise HTTPException(status_code=503, detail="Model is not loaded. Please ensure the model is trained.")

    try:
        # Convert input Pydantic model to a dictionary
        data_dict = input_data.model_dump()

        # Create a Polars DataFrame with a single row
        df = pl.DataFrame([data_dict])

        # Apply the categorical mappings
        df_mapped = apply_mappings(df)

        # Some sklearn/xgboost components expect pandas or numpy.
        X_input = df_mapped.to_pandas()

        # Get prediction and probabilities
        pipeline = ml_models["pipeline"]
        prediction = int(pipeline.predict(X_input)[0])
        probability = float(pipeline.predict_proba(X_input)[0][1])

        # Format the response message
        if prediction == 1:
            message = "High risk of heart disease detected."
        else:
            message = "Low risk of heart disease detected."

        return PredictionResponse(
            prediction=prediction,
            probability=probability,
            message=message
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
