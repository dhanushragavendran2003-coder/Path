from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

class ModelTrainer:
    def __init__(self, model):
        self.model = model

    def train(self, X_train, y_train):
        self.model.fit(X_train, y_train)

    def evaluate(self, X, y, set_name="Target"):
        predictions = self.model.predict(X)
        accuracy = accuracy_score(y, predictions)
        print(f"Accuracy on {set_name} set: {accuracy:.4f}")
        return accuracy, predictions

    def print_classification_report(self, y_true, y_pred, target_names=None):
        print("\nClassification Report:")
        print(classification_report(y_true, y_pred, target_names=target_names))

    def plot_confusion_matrix(self, y_true, y_pred, labels=None):
        cm = confusion_matrix(y_true, y_pred)
        plt.figure(figsize=(12, 8))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=labels, yticklabels=labels)
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.title('Confusion Matrix')
        plt.show()

    def predict(self, X):
        return self.model.predict(X)
