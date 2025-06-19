from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Cargar el conjunto de datos
data_file = 'fact_ghg_unfccc.csv'  # Asegúrate de que la ruta sea correcta
data = pd.read_csv(data_file)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/data')
def get_data():
    # Procesar los datos según sea necesario
    filtered_data = data[['TIME_PERIOD', 'geo', 'Sector_code', 'OBS_VALUE']]
    filtered_data = filtered_data.dropna()
    return jsonify(filtered_data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
