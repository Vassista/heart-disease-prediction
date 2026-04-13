import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.pipeline import Pipeline
from .preprocessing import get_preprocessor

def create_pipeline(model):
    """
    Wraps a model in a scikit-learn pipeline with the standard preprocessor.
    """
    return Pipeline(steps=[
        ('preprocessor', get_preprocessor()),
        ('model', model)
    ])

def get_best_lr():
    """Returns Logistic Regression with parameters from the notebook tuning."""
    return LogisticRegression(C=0.23357214690901212, solver='liblinear', max_iter=1000)

def get_best_rf():
    """Returns Random Forest with parameters from the notebook tuning."""
    return RandomForestClassifier(n_estimators=100, random_state=42)

def get_best_xgboost():
    """Returns XGBClassifier with parameters from the notebook tuning."""
    return XGBClassifier(
        subsample=0.7,
        n_estimators=100,
        max_depth=3,
        learning_rate=0.05,
        gamma=0.5,
        colsample_bytree=0.7,
        random_state=42
    )

def save_model(model, filepath):
    joblib.dump(model, filepath)

def load_model(filepath):
    return joblib.load(filepath)
