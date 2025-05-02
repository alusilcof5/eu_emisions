import json
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  


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
    
    return render_template('country_details.html', country=country)

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

# Ruta de agradecimiento

@app.route('/thanks')
def thanks():
    return render_template('thanks.html')

if __name__ == '__main__':
    app.run(debug=True)
