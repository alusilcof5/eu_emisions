import json
from flask import Flask, render_template

app = Flask(__name__)

# Ruta principal que muestra las emisiones de CO2 por país
@app.route('/')
def index():
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)
    
    return render_template('index.html', countries=countries)

@app.route('/country/<country_code>')
def country_details(country_code):
    # Cargar los datos de emisiones de CO2 desde el archivo JSON
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)
    
    # Buscar el país por su código
    country = next((c for c in countries if c['code'] == country_code), None)
    
    if country is None:
        return "País no encontrado", 404  
   
    return render_template('country_details.html', country=country)


if __name__ == '__main__':
    app.run(debug=True)
