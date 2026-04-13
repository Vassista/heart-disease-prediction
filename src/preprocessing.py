import polars as pl
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline

# Mappings used in the original notebook 
CATEGORICAL_MAPPINGS = {
    "sex":     {"M": 1, "F": 0},
    "cp":      {"ATA": 1, "TA": 0, "NAP": 2, "ASY": 3},
    "restecg": {"Normal": 0, "ST": 1, "LVH": 2},
    "exang":   {"Y": 1, "N": 0},
    "slope":   {"Flat": 1, "Up": 0, "Down": 2},
}

CONTINUOUS_FEATURES = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
ONEHOT_FEATURES = ['cp', 'restecg', 'slope']

def apply_mappings(df: pl.DataFrame) -> pl.DataFrame:
    """
    Apply categorical string-to-int mappings as done in the notebook.
    """
    return df.with_columns([
        pl.col(col).replace(CATEGORICAL_MAPPINGS[col]).cast(pl.Int64)
        for col in CATEGORICAL_MAPPINGS if col in df.columns
    ])

def get_preprocessor() -> ColumnTransformer:
    """
    Returns the ColumnTransformer used in the training notebook.
    """
    return ColumnTransformer(
        transformers=[
            ('scaler', StandardScaler(), CONTINUOUS_FEATURES),
            ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False), ONEHOT_FEATURES)
        ],
        remainder='passthrough'
    )
