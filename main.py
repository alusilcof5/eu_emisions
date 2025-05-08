# main.py
import json
from flask import Flask, render_template, request, redirect, url_for, flash
import pandas as pd
from scripts import functionss as fss

app = Flask(__name__)
app.secret_key = 'your_secret_key'  

# Ruta al archivo CSV
CSV_PATH = 'static/package/data_world_countries.csv'

# Cargar el CSV una vez al iniciar la aplicación
try:
    data = pd.read_csv(CSV_PATH)
except Exception as e:
    print(f"Error al cargar el CSV: {str(e)}")
    data = None

@app.route('/')
def index():
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)
    return render_template('index.html', countries=countries)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/project')
def project():
    return render_template('project.html')

@app.route('/country/<country_code>')
def country_details(country_code):
    # Cargar datos del JSON
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)
    
    country = next((c for c in countries if c['code'] == country_code), None)
    
    if country is None:
        return "País no encontrado", 404
    
    # Generar la gráfica si hay datos del CSV
    img_path = None
    if data is not None:
        # Asumimos que country['name'] en el JSON coincide con country_name en el CSV
        country_name = country['name']
        img_path = fss.grafica(country_name, data)
    
    # Obtener emisiones totales desde el CSV si está disponible
    emissions = 0
    if data is not None:
        country_data = data[data['country_name'] == country_name]
        emissions = country_data['value'].sum() if not country_data.empty else 0
    
    # Actualizar el objeto country con las emisiones
    country['emissions'] = emissions
    
    return render_template('country_details.html', country=country, img_path=img_path)

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit_form():
    name = request.form.get('name')
    email = request.form.get('email')
    address = request.form.get('address')
    message = request.form.get('message')
    
    if not all([name, email, address, message]):
        flash('Todos los campos son obligatorios.')
        return redirect(url_for('form'))
    
    return redirect(url_for('thanks'))

@app.route('/thanks')
def thanks():
    return render_template('thanks.html')

if __name__ == '__main__':
    app.run(debug=True)