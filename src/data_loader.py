import polars as pl
from pathlib import Path

def load_data(file_path: str = "data/heart-disease.csv") -> pl.DataFrame:
    """
    Load the heart disease dataset using Polars.
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Data file not found at {file_path}")
    
    return pl.read_csv(file_path)
