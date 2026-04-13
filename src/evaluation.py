import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

def evaluate_model(model, X_test, y_test):
    """
    Prints classification report and returns accuracy.
    """
    y_preds = model.predict(X_test)
    print("Classification Report:")
    print(classification_report(y_test, y_preds))
    print(f"Accuracy Score: {accuracy_score(y_test, y_preds):.4f}")
    return y_preds

def plot_confusion_matrix(y_true, y_pred):
    """
    Plots a heatmap of the confusion matrix.
    """
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(6, 4))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    plt.show()
