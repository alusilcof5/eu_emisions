import json
from flask import Flask, render_template

app = Flask(__name__)

# Ruta principal - vista general de todos los países
@app.route('/')
def index():
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)
    
    return render_template('index.html', countries=countries)

# Ruta "About Us" - información del equipo
@app.route('/about')
def about():
    # No necesitamos leer el JSON aquí, porque no mostramos países
    return render_template('about.html')

@app.route('/project')
def project():
    # No necesitamos leer el JSON aquí, porque no mostramos países
    return render_template('project.html')

# Ruta para ver detalles de un país
@app.route('/country/<country_code>')
def country_details(country_code):
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)
    
    # Buscar el país por su código (por ejemplo: 'es', 'fr', etc.)
    country = next((c for c in countries if c['code'] == country_code), None)
    
    if country is None:
        return "País no encontrado", 404  
    
    return render_template('country_details.html', country=country)

if __name__ == '__main__':
    app.run(debug=True)
