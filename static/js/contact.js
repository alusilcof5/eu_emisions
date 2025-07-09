document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        if (response.ok) {
            // Show popup
            const popup = document.getElementById('success-popup');
            popup.style.display = 'flex';
            // Reset form
            form.reset();
        } else {
            alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión. Por favor, verifica tu conexión e intenta de nuevo.');
    }
});

// Close popup when clicking the close button
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('success-popup').style.display = 'none';
});

// Close popup when clicking outside the popup content
document.getElementById('success-popup').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});
