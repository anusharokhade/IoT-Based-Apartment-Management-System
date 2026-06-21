import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# Load dataset
df = pd.read_csv(r'd:\HousingData.csv')

# Preprocessing
categorical_cols = ['Posted On', 'Floor', 'Area Type', 'Area Locality', 'City', 
                    'Furnishing Status', 'Tenant Preferred', 'Point of Contact']
label_encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))  # Handle missing/mixed types
    label_encoders[col] = le

# Features and Target
X = df.drop('Rent', axis=1)
y = df['Rent']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on test set
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error on test set: {mse:.2f}")

# ---- TEST DATA ----
# Create one row of test data
# Make sure the feature order matches X.columns

# Example input:
# Posted On: 0, BHK: 2, Size: 1000, Floor: 3, Area Type: 1, Area Locality: 50, 
# City: 2, Furnishing Status: 1, Tenant Preferred: 0, Bathroom: 2, Point of Contact: 5

test_data = pd.DataFrame([{
    'Posted On': 0,             # Example value
    'BHK': 2,                   # Example value
    'Size': 1278,               # Example value
    'Floor': 1,                 # Example value
    'Area Type': 1,             # Example value
    'Area Locality': 50,        # Bhagyanagar
    'City': 2,                  # Belgaum
    'Furnishing Status': 1,     # Example value
    'Tenant Preferred': 1,      # Family
    'Bathroom': 2,              # Example value
    'Point of Contact': 5       # Example value
}])

# Predict the rent
predicted_rent = model.predict(test_data)[0]
print(f"Predicted Rent for the test data: {predicted_rent:.2f}")
