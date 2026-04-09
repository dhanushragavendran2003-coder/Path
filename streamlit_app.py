
import streamlit as st
import pandas as pd
import numpy as np
import time

# --- Page Configuration ---
st.set_page_config(
    page_title="Career Prediction - Educational Demo",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- Custom Styling (Premium Aesthetics) ---
st.markdown("""
<style>
    /* Global Styles */
    .stApp {
        background-color: #0e1117;
        color: #fafafa;
        font-family: 'Inter', sans-serif;
    }
    
    /* Headings */
    h1, h2, h3 {
        color: #ffffff;
        font-weight: 700;
    }
    h1 {
        background: -webkit-linear-gradient(45deg, #00d2ff, #3a7bd5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-bottom: 20px;
    }
    
    /* Metrics Cards */
    .metric-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        margin-bottom: 10px;
        transition: transform 0.3s ease;
    }
    .metric-card:hover {
        transform: translateY(-5px);
        border-color: #3a7bd5;
    }
    
    /* Custom Sidebar */
    [data-testid="stSidebar"] {
        background-color: #161b22;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Info Boxes */
    .stInfo {
        border-left-color: #3a7bd5 !important;
        background-color: rgba(58, 123, 213, 0.1) !important;
    }
    
    /* Buttons */
    .stButton>button {
        background: linear-gradient(90deg, #00d2ff, #3a7bd5);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 24px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .stButton>button:hover {
        opacity: 0.9;
        box-shadow: 0 4px 12px rgba(0, 210, 255, 0.3);
    }
</style>
""", unsafe_allow_html=True)

# --- Heuristic Prediction Logic (Educational Mock) ---
def predict_role(inputs):
    # Simple logic to return a plausible role based on inputs for demonstration
    scores = {}
    
    # Extract values
    prog = inputs['Programming Skills']
    arch = inputs['Computer Architecture']
    proj_mgmt = inputs['Project Management']
    comm = inputs['Communication skills']
    graphics = inputs.get('Graphics', 0) # Not in input, assumed low
    
    # Define roles and heuristic scores
    scores['Software Developer'] = prog * 2 + arch
    scores['Database Administrator'] = arch * 2 + prog
    scores['Project Manager'] = proj_mgmt * 2.5 + comm
    scores['Technical Writer'] = comm * 2 + inputs['Conscientousness'] * 5
    scores['AI ML Specialist'] = prog * 1.5 + inputs['Openness'] * 5 + arch
    scores['Customer Service Executive'] = comm * 2.5 + inputs['Extraversion'] * 5
    scores['Cyber Security Specialist'] = arch * 1.5 + inputs['Conscientousness'] * 5 + prog
    
    # Return top role
    return max(scores, key=scores.get)

# --- Main App Structure ---

def main():
    st.title("🎓 Career Prediction System: Educational Walkthrough")
    st.markdown("### Understanding the Machine Learning Workflow: From Overfitting to Generalization")
    
    # --- Sidebar: User Inputs ---
    with st.sidebar:
        st.header("📝 Candidate Profile")
        st.markdown("*Enter the candidate's skills and traits (14 Features)*")
        
        input_data = {}
        
        st.subheader("Technical Skills (0-10)")
        input_data['Computer Architecture'] = st.slider("Computer Architecture", 0, 10, 5)
        input_data['Programming Skills'] = st.slider("Programming Skills", 0, 10, 5)
        input_data['Project Management'] = st.slider("Project Management", 0, 10, 5)
        input_data['Communication skills'] = st.slider("Communication Skills", 0, 10, 5)
        
        st.subheader("Personality Traits (0.0 - 1.0)")
        input_data['Openness'] = st.slider("Openness", 0.0, 1.0, 0.5)
        input_data['Conscientousness'] = st.slider("Conscientiousness", 0.0, 1.0, 0.5)
        input_data['Extraversion'] = st.slider("Extraversion", 0.0, 1.0, 0.5)
        input_data['Agreeableness'] = st.slider("Agreeableness", 0.0, 1.0, 0.5)
        input_data['Emotional_Range'] = st.slider("Emotional Range", 0.0, 1.0, 0.5)
        input_data['Conversation'] = st.slider("Conversation", 0.0, 1.0, 0.5)
        input_data['Openness to Change'] = st.slider("Openness to Change", 0.0, 1.0, 0.5)
        input_data['Hedonism'] = st.slider("Hedonism", 0.0, 1.0, 0.5)
        input_data['Self-enhancement'] = st.slider("Self-enhancement", 0.0, 1.0, 0.5)
        input_data['Self-transcendence'] = st.slider("Self-transcendence", 0.0, 1.0, 0.5)
        
        st.markdown("---")
        show_phase1 = st.toggle("🔍 Show Phase 1 (Initial Model)", value=False)

    # --- Main Content ---
    
    # Create the prediction (Mock)
    predicted_role = predict_role(input_data)
    
    # PHASE 1: INITIAL MODELS (Hidden by default)
    if show_phase1:
        st.markdown("## 🔴 Phase 1: Initial Model (28 Features)")
        st.info("ℹ️ **Educational Note:** In this phase, we used all 28 available features. The models achieved **100% accuracy**, which is a classic sign of **overfitting**. They memorized the training data but failed to generalize to real-world scenarios.")
        
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("### Model Performance (Accuracy)")
            # Mock Data for Phase 1
            perf_df1 = pd.DataFrame({
                'Model': ['Decision Tree', 'SVM', 'Random Forest', 'k-NN', 'Naive Bayes'],
                'Accuracy': [100, 100, 100, 100, 100]
            })
            st.dataframe(perf_df1.style.format({'Accuracy': '{:.0f}%'}), hide_index=True, use_container_width=True)
            
        with col2:
            st.markdown("### Prediction Result")
            st.success(f"**Predicted Role:** {predicted_role}")
            st.caption("⚠️ This prediction is highly confident but potentially fragile due to overfitting.")

        st.markdown("---")

    # PHASE 2: REVISED MODELS
    st.markdown("## 🟢 Phase 2: Revised Model (14 Features)")
    st.markdown("We optimized the dataset by selecting the **14 most important features** (Feature Selection). This reduced noise and improved the model's ability to **generalize**.")
    
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown("### 📊 Live Comparison of Models")
        
        # Data for Phase 2
        models = ['Random Forest', 'SVM', 'Decision Tree', 'k-NN', 'Naive Bayes']
        accuracies = [90, 65, 60, 58, 52] # As per educational script
        colors = ['#00d2ff', '#333333', '#333333', '#333333', '#333333']
        
        chart_data = pd.DataFrame({
            'Model': models,
            'Accuracy (%)': accuracies
        })
        
        st.bar_chart(chart_data, x="Model", y="Accuracy (%)", color="#3a7bd5")
        
        st.caption("Notice how **Random Forest** outperforms others significantly with ~90% accuracy, while others drop to 50-65%. This highlights why algorithm selection matters as much as feature selection.")
        
    with col2:
        st.markdown("### 🤖 Final Prediction")
        
        # Simulation delay for effect
        with st.spinner("Analyzing candidate profile..."):
            time.sleep(0.5)
        
        st.markdown(f"""
        <div class="metric-card" style="text-align: center;">
            <h3 style="margin-bottom: 0px; color: #888;">Recommended Role</h3>
            <h1 style="font-size: 2.5em; margin-top: 10px;">{predicted_role}</h1>
            <p style="color: #00d2ff; font-weight: bold;">Confidence: 91.2%</p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("### Why Random Forest?")
        st.success("""
        ✅ **Best Balance:** High accuracy without overfitting.
        \n✅ **Robustness:** Handles non-linear relationships between personality traits and skills.
        \n✅ **Ensemble Method:** Combines multiple decision trees to reduce error.
        """)

    # PHASE 3: COMPARISON SUMMARY
    if show_phase1:
        st.markdown("## ⚖️ Phase 3: The Verdict")
        st.markdown("Comparing the two phases highlights the importance of the **ML Guidelines**: *Don't just trust high accuracy numbers blindly.*")
        
        comp_col1, comp_col2, comp_col3 = st.columns(3)
        with comp_col1:
            st.metric(label="Phase 1 Features", value="28", delta="Initial")
        with comp_col2:
            st.metric(label="Phase 2 Features", value="14", delta="-50% (Optimized)", delta_color="normal")
        with comp_col3:
            st.metric(label="Best Model Selection", value="Random Forest", delta="Validated")


if __name__ == "__main__":
    main()
