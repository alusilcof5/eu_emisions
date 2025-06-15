from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, ContactMessage

@app.route('/form', methods=['GET'])
def show_form():
    return render_template('form.html')

@app.route('/submit_form', methods=['POST'])
def submit_form():
    name = request.form['name']
    email = request.form['email']
    address = request.form['address']
    message = request.form['message']

    new_msg = ContactMessage(name=name, email=email, address=address, message=message)
    db.session.add(new_msg)
    db.session.commit()

    return render_template('form.html', show_thanks=True)

    flash('Gracias por tu mensaje. Te contactaremos pronto.')
    return redirect(url_for('show_form'))

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()

    app.run(debug=True)