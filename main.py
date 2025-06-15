# main.py

import os
import json
import pandas as pd
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, ContactMessage
from scripts import functionss as fss

# Cargar variables de entorno
load_dotenv()

# Crear la app
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'fallback_default_key')

# Configuración de SQLAlchemy (SQLite local)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact_messages.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la base de datos con la app
db.init_app(app)

# Ruta al CSV
CSV_PATH = 'static/package/data_world_countries.csv'

# Cargar el CSV (si existe)
try:
    data = pd.read_csv(CSV_PATH)
except Exception as e:
    print(f"Error al cargar el CSV: {str(e)}")
    data = None

# Configurar carpeta de plantillas según el idioma
def set_template_folder(lang):
    base_path = os.path.abspath('.')
    if lang == 'en':
        app.jinja_loader.searchpath = [os.path.join(base_path, 'templates_en')]
    else:
        app.jinja_loader.searchpath = [os.path.join(base_path, 'templates')]

@app.before_request
def before_request():
    lang = request.args.get('lang', 'es')
    set_template_folder(lang)

# ------------------ Rutas ------------------

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
    with open('static/json/emisiones_co2.json', 'r') as f:
        countries = json.load(f)

    country = next((c for c in countries if c['code'] == country_code), None)

    if country is None:
        return "País no encontrado", 404

    img_path = None
    if data is not None:
        country_name = country['name']
        img_path = fss.grafica(country_name, data)

    emissions = 0
    if data is not None:
        country_data = data[data['country_name'] == country_name]
        emissions = country_data['value'].sum() if not country_data.empty else 0

    country['emissions'] = emissions
    return render_template('country_details.html', country=country, img_path=img_path)

@app.route('/form')
def show_form():
    show_thanks = request.args.get('show_thanks') == '1'
    return render_template('form.html', show_thanks=show_thanks)

@app.route('/submit_form', methods=['POST'])
def submit_form():
    name = request.form.get('name')
    email = request.form.get('email')
    address = request.form.get('address')
    message = request.form.get('message')

    if not all([name, email, address, message]):
        flash('Todos los campos son obligatorios.', 'error')
        return redirect(url_for('show_form'))

    new_msg = ContactMessage(name=name, email=email, address=address, message=message)
    db.session.add(new_msg)
    db.session.commit()

    # Redirigir al formulario con parámetro para mostrar el popup de agradecimiento
    return redirect(url_for('show_form', show_thanks=1))


@app.route('/data-architecture')
def data_architecture():
    return render_template('data_architecture.html')

@app.route('/csv-reader')
def csv_reader():
    return render_template('csv_reader.html')

@app.route('/visualizacion')
def visualizacion():
    return render_template('visualizacion.html')

# ------------------ Iniciar la app ------------------

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
