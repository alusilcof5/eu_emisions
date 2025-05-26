const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const icon = toggle?.querySelector('i');
    const body = document.body;

    if (!toggle || !icon) {
        console.error("No se encontró el botón o el ícono del modo oscuro.");
        return;
    }

    // Aplicar tema guardado (si existe)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Evento al hacer clic en el botón
    toggle.addEventListener('click', () => {
        const darkModeOn = body.classList.toggle('dark-mode');
        if (darkModeOn) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    console.log("Modo oscuro activado correctamente.");
});

document.addEventListener('DOMContentLoaded', () => {
    const modalLinks = {
      'Política de Privacidad': 'privacyModal',
      'Términos y Condiciones': 'termsModal'
    };
  
    document.querySelectorAll('.legal a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = modalLinks[link.textContent.trim()];
        if (modalId) {
          document.getElementById(modalId).style.display = 'block';
        }
      });
    });
  
    document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modalId = closeBtn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
      });
    });
  
    // Cierra si se hace clic fuera del modal
    window.onclick = function(event) {
      document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    };
  });
  
