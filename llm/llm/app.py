import streamlit as st
import os
import pandas as pd
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint

# Load environment variables
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")  # Use the same token name across scripts

if not HF_TOKEN:
    st.error("API token is missing. Please check your .env file or environment variables.")
    st.stop()

# Define LLM endpoint
llm = HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    max_length=500,
    temperature=0.7,
    token=HF_TOKEN
)

# Load dataset
@st.cache_data
def load_data():
    df = pd.read_csv("Leads.csv")  # Ensure this file exists
    filtered_df = df[[  
        "TotalVisits", "Total Time Spent on Website", "Page Views Per Visit",
        "Lead Quality"
    ]]
    return filtered_df.describe(include='all').to_string()

dataset_summary = load_data()

# Function to generate predictions
def predict_lead(total_visits, total_time_spent, page_views, lead_quality):
    prompt = f"""
    Predict lead likelihood:
    - Total Visits: {total_visits}
    - Time Spent: {total_time_spent} seconds
    - Page Views: {page_views}
    - Lead Quality: {lead_quality}

    Based on dataset trends, patterns, and correlations, predict whether the customer is likely to become a lead or not. Explain reasoning.

    Dataset Summary:
    {dataset_summary}
    """

    response = llm(prompt)
    return response

# Streamlit UI
st.title("🔮 Lead Prediction App")

# Sidebar for user inputs
st.sidebar.header("Enter Lead Details")

total_visits = st.sidebar.number_input("Total Visits", min_value=0.0, format="%.2f")
total_time_spent = st.sidebar.number_input("Total Time Spent (seconds)", min_value=0.0, format="%.2f")
page_views = st.sidebar.number_input("Page Views Per Visit", min_value=0.0, format="%.2f")
lead_quality = st.sidebar.selectbox("Lead Quality", ["Low", "Medium", "High"])  # Ensure consistency

# Prediction Button
if st.sidebar.button("Predict Lead"):
    with st.spinner("Analyzing lead conversion probability..."):
        response = predict_lead(total_visits, total_time_spent, page_views, lead_quality)

    st.subheader("📊 Prediction Result:")

    # Extracting whether the prediction is lead or not from response
    if "likely to become a lead" in response.lower():
        st.markdown("### ✅ **Prediction: This customer is a :green[**LEAD**]!**")
    else:
        st.markdown("### ❌ **Prediction: This customer is :red[**NOT a LEAD**].**")

    # Show full explanation
    st.write(response)
