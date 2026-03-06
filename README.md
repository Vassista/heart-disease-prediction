# 🫀 Heart Disease Prediction

> **Machine Learning model to predict heart disease using classification algorithms.**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.x-F7931E?logo=scikit-learn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-2.x-006400)
![Polars](https://img.shields.io/badge/Polars-DataFrame-CD792C)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Overview

This project builds and evaluates several classification models to predict whether a patient has heart disease based on clinical features. It follows a structured machine learning workflow from data exploration to final model evaluation.

### Key Steps

| Step | Description |
|------|-------------|
| **EDA** | Explore distributions, correlations and class balance |
| **Feature Engineering** | Z-score scaling + One-Hot Encoding via `ColumnTransformer` |
| **Modelling** | Logistic Regression · Random Forest · XGBoost |
| **Tuning** | `GridSearchCV` / `RandomizedSearchCV` for hyperparameter optimisation |
| **Evaluation** | Confusion Matrix · Classification Report · ROC-AUC |

---

## 📊 Dataset

The dataset originates from the **Cleveland Heart Disease** database from the [UCI ML Repository](https://archive.ics.uci.edu/ml/datasets/heart+Disease) and is also available on [Kaggle](https://www.kaggle.com/datasets/sumaiyatasmeem/heart-disease-classification-dataset).

Note on Dataset Evolution:
> the Cleveland database was very limited because of its smaller sample size ($n \approx 301$). To work and imporve the model performance, the project shifted to a comprehensive Heart Failure Prediction Dataset, which aggregates five existing heart datasets (including the UCI ML repository). To maintain codebase consistency, categorical features from the new dataset were mapped to resemble the original UCI dataset. This allowed for a seamless transition to the larger dataset with very less refactoring. The new dataset can be found on [kaggle](https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction)

| Feature | Description |
|---------|-------------|
| `age` | Age in years |
| `sex` | 1 = male · 0 = female |
| `cp` | Chest pain type (0–3) |
| `trestbps` | Resting blood pressure (mm Hg) |
| `chol` | Serum cholesterol (mg/dl) |
| `fbs` | Fasting blood sugar > 120 mg/dl |
| `restecg` | Resting ECG results (0–2) |
| `thalach` | Maximum heart rate achieved |
| `exang` | Exercise-induced angina |
| `oldpeak` | ST depression induced by exercise |
| `slope` | Slope of peak exercise ST segment |
| `target` | **1 = disease · 0 = no disease** |

---

## 🧠 Models & Results

| Model | CV Accuracy | Test Accuracy |
|-------|:----------:|:------------:|
| Logistic Regression | ~85% | ~86% |
| Random Forest | ~86% | ~87% |
| **XGBoost** ✅ | **~87%** | **~88%** |

> **Best model:** XGBoost: best balance of precision, recall and AUC-ROC with less overfitting after tuning.

---

## 🛠️ Tech Stack

- **Data wrangling:** [Polars](https://pola.rs/)
- **Visualisation:** Matplotlib · Seaborn
- **Machine Learning:** scikit-learn · XGBoost
- **Preprocessing:** `ColumnTransformer` · `Pipeline` · `StandardScaler` · `OneHotEncoder`

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Vassista/heart-disease-prediction.git
cd heart-disease-prediction

# Install dependencies
pip install -r requirements.txt   # or: pip install polars scikit-learn xgboost seaborn matplotlib numpy

# Run the notebook
jupyter notebook heart-disease.ipynb
```

---

## 📁 Project Structure

```
heart-disease-prediction/
├── data/
│   └── heart-disease.csv       # Dataset
├── heart-disease.ipynb          # Main notebook
├── README.md                    # This file
└── .gitignore
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ because I love Machine Learning.*
