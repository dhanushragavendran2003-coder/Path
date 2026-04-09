import json
import os

notebook_path = r'd:\Career-Prediction-Using-Machine-Learning-main\Career-Prediction-Using-Machine-Learning-main\First Model Files\KNN Classifier.ipynb'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Cell 1 is at index 1 (the 2nd cell)
# Looking at the content from Step 27:
# 25:   {
# 26:    "cell_type": "code",
# 27:    "execution_count": 2,
# 28:    "metadata": {},
# 29:    "outputs": [],
# 30:    "source": [
# 31:     "data = pd.read_csv(r\".\\CareerMapping.csv\")"
# 32:    ]
# 33:   },

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        source = cell['source']
        for i, line in enumerate(source):
            if 'pd.read_csv' in line and r'.\CareerMapping.csv' in line:
                source[i] = line.replace(r'.\CareerMapping.csv', '../Data/CareerMapping.csv')
                print(f"Fixed line: {source[i]}")
            # Also fix the typo in cell 19 if found
            if 'programming_skill = data[\'Role\'].value_counts()' in line:
                source[i] = line.replace('data[\'Role\']', 'data[\'Programming Skills\']')
                print(f"Fixed typo: {source[i]}")

with open(notebook_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)
