import pandas as pd
import numpy as np
import os

csv_path = os.path.join('Data', 'CareerMapping1.csv')

try:
    df = pd.read_csv(csv_path)
    if 'Unnamed: 0' in df.columns:
        df = df.drop(columns=['Unnamed: 0'])
    
    technical_skills = [
        'Computer Architecture', 'Programming Skills', 
        'Project Management', 'Communication skills'
    ]
    
    personality_traits = [
        'Openness', 'Conscientousness', 'Extraversion', 
        'Agreeableness', 'Emotional_Range', 'Conversation', 
        'Openness to Change', 'Hedonism', 'Self-enhancement', 
        'Self-transcendence'
    ]
    
    report = "--- Audit Report: Data Ranges ---\n"
    report += "-" * 40 + "\n"
    for col in technical_skills:
        if col in df.columns:
            val_min = df[col].min()
            val_max = df[col].max()
            report += f"{col:<25}: Min={val_min:>6.2f}, Max={val_max:>6.2f}\n"
            
    report += "-" * 40 + "\n"
    for col in personality_traits:
        if col in df.columns:
            val_min = df[col].min()
            val_max = df[col].max()
            report += f"{col:<25}: Min={val_min:>6.2f}, Max={val_max:>6.2f}\n"
            
    report += "-" * 40 + "\n"
    report += f"Target: Role, Classes: {len(df['Role'].unique())}\n"
    
    with open('audit_results.txt', 'w', encoding='ascii') as f:
        f.write(report)
    print("Report written to audit_results.txt")

except Exception as e:
    print(f"Error: {str(e)}")
