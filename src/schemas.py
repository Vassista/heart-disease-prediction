from pydantic import BaseModel, Field

class HeartDiseaseInput(BaseModel):
    age: float = Field(..., description="Age in years", example=55.0)
    sex: str = Field(..., description="1 = male (M), 0 = female (F)", example="M")
    cp: str = Field(..., description="Chest pain type (ATA, TA, NAP, ASY)", example="ATA")
    trestbps: float = Field(..., description="Resting blood pressure (mm Hg)", example=140.0)
    chol: float = Field(..., description="Serum cholesterol (mg/dl)", example=289.0)
    fbs: int = Field(..., description="Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)", example=0)
    restecg: str = Field(..., description="Resting ECG results (Normal, ST, LVH)", example="Normal")
    thalach: float = Field(..., description="Maximum heart rate achieved", example=172.0)
    exang: str = Field(..., description="Exercise-induced angina (Y = Yes, N = No)", example="N")
    oldpeak: float = Field(..., description="ST depression induced by exercise", example=0.0)
    slope: str = Field(..., description="Slope of peak exercise ST segment (Up, Flat, Down)", example="Up")

class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="1 = Heart Disease, 0 = Normal")
    probability: float = Field(..., description="Probability of having heart disease")
    message: str = Field(..., description="Human readable message")
