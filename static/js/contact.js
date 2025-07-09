document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        if (response.ok) {
            // Mostrar el pop-up
            const popup = document.getElementById('success-popup');
            popup.style.display = 'flex';
            // Reiniciar el formulario
            form.reset();
        } else {
            alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión. Por favor, verifica tu conexión e intenta de nuevo.');
    }
});

// Cerrar el pop-up al hacer clic en el botón de cerrar
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('success-popup').style.display = 'none';
});

// Cerrar el pop-up al hacer clic fuera del contenido del pop-up
document.getElementById('success-popup').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});
