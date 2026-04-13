import polars as pl
from sklearn.model_selection import train_test_split
from src.data_loader import load_data
from src.preprocessing import apply_mappings
from src.models import create_pipeline, get_best_xgboost, save_model
from src.evaluation import evaluate_model, plot_confusion_matrix
from src.utils import setup_logging

def run_training_pipeline():
    setup_logging()

    # 1. Load Data
    df = load_data("data/heart-disease.csv")

    # 2. Preprocess
    # The notebook maps categorical strings to integers before the sklearn pipeline
    df_mapped = apply_mappings(df)

    # 3. Split Data
    X = df_mapped.drop("target").to_pandas() # Some sklearn/xgboost versions prefer pandas/numpy
    y = df_mapped["target"].to_pandas()

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 4. Create and Train Model (XGBoost with best params from notebook)
    model = get_best_xgboost()
    pipeline = create_pipeline(model)

    print("Training XGBoost Pipeline...")
    pipeline.fit(X_train, y_train)

    # 5. Evaluate
    y_preds = evaluate_model(pipeline, X_test, y_test)
    # plot_confusion_matrix(y_test, y_preds) # Uncomment to view plot

    # 6. Save Model
    save_model(pipeline, "models/heart_disease_model.joblib")
    print("Model saved to models/heart_disease_model.joblib")

if __name__ == "__main__":
    run_training_pipeline()
