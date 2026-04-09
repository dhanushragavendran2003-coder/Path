import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

class DataProcessor:
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = None
        self.X = None
        self.y = None
        self.label_encoder = LabelEncoder()
        self.label_mapping = None

    def load_data(self, drop_unnamed=True):
        self.data = pd.read_csv(self.file_path)
        if drop_unnamed and "Unnamed: 0" in self.data.columns:
            self.data.drop(columns=["Unnamed: 0"], inplace=True)
        return self.data

    def preprocess(self, target_column="Role"):
        if self.data is None:
            self.load_data()
        
        y = self.data.pop(target_column)
        self.X = self.data
        self.y = self.label_encoder.fit_transform(y)
        
        original_labels = self.label_encoder.classes_
        self.label_mapping = {i: label for i, label in enumerate(original_labels)}
        return self.X, self.y

    def split_data(self, test_size=0.3, val_size=0.2, random_state=42):
        # Initial split to get the test set
        X_train_val, X_test, y_train_val, y_test = train_test_split(
            self.X, self.y, test_size=test_size, random_state=random_state
        )
        
        # Calculate the size of the validation set relative to the train_val set
        # to achieve the desired overall val_size
        relative_val_size = val_size / (1 - test_size)
        
        X_train, X_val, y_train, y_val = train_test_split(
            X_train_val, y_train_val, test_size=relative_val_size, random_state=random_state
        )
        
        return X_train, X_val, X_test, y_train, y_val, y_test

    def get_label_mapping(self):
        return self.label_mapping
