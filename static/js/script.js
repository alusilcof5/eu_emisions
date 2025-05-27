/* const menuToggle = document.querySelector('.menu-toggle');
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
  
 */

  // Función para manejar el toggle del menú
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Función para inicializar el tema oscuro
function initializeTheme() {
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
      toggleDarkMode(body, icon);
  });

  console.log("Modo oscuro activado correctamente.");
}

// Función para alternar el modo oscuro
function toggleDarkMode(body, icon) {
  const darkModeOn = body.classList.toggle('dark-mode');
  if (darkModeOn) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
  } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
  }
}

// Función para manejar la apertura de modales
function setupModalLinks() {
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
}

// Función para manejar el cierre de modales
function setupCloseButtons() {
  document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
          const modalId = closeBtn.getAttribute('data-modal');
          document.getElementById(modalId).style.display = 'none';
      });
  });
}

// Función para cerrar el modal al hacer clic fuera de él
function setupOutsideClickToClose() {
  window.onclick = function(event) {
      document.querySelectorAll('.modal').forEach(modal => {
          if (event.target === modal) {
              modal.style.display = 'none';
          }
      });
  };
}

// Inicialización de eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', toggleMenu);

  initializeTheme();
  setupModalLinks();
  setupCloseButtons();
  setupOutsideClickToClose();
});
