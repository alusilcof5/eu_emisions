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

// Función para abrir los modales
        document.getElementById('openPrivacyModal').onclick = function() {
            document.getElementById('privacyModal').style.display = 'block';
        }
        document.getElementById('openTermsModal').onclick = function() {
            document.getElementById('termsModal').style.display = 'block';
        }
        // Cerrar los modales
        var closeButtons = document.querySelectorAll('.close');
        closeButtons.forEach(function(button) {
            button.onclick = function() {
                var modal = document.getElementById(button.getAttribute('data-modal'));
                modal.style.display = 'none';
            }
        });
        // Cerrar el modal al hacer clic fuera del contenido
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        }

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
     
  const DATA_URL = 'data/emissions.csv';
let emissionsData = [];
let availableYears = [];
let selectedYear = 2023;

document.addEventListener('DOMContentLoaded', async () => {
    emissionsData = await loadCSV(DATA_URL);
    availableYears = [...new Set(emissionsData.map(d => d.year))].sort();

    populateYearSelector();
    renderCharts();
});

function populateYearSelector() {
    const selector = document.getElementById('year-selector');
    availableYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        if (year == selectedYear) option.selected = true;
        selector.appendChild(option);
    });

    selector.addEventListener('change', () => {
        selectedYear = parseInt(selector.value);
        renderCharts();
    });
}

function renderCharts() {
    const container = document.getElementById('charts-container');
    container.innerHTML = ''; // Clear previous charts

    ['AT', 'SE'].forEach(country => {
        const section = document.createElement('section');
        section.className = "mb-12";

        const title = document.createElement('h2');
        title.className = "text-2xl font-semibold text-gray-800 mb-4";
        title.textContent = `${country === 'AT' ? 'Austria' : 'Sweden'} (${country})`;
        section.appendChild(title);

        const countryData = emissionsData.filter(d => d.country === country);

        if (countryData.length === 0) {
            const p = document.createElement('p');
            p.className = "text-gray-600";
            p.textContent = `No data available for ${country}.`;
            section.appendChild(p);
            container.appendChild(section);
            return;
        }

        // Line Chart
        createChart(section, `${country.toLowerCase()}-line-chart`, generateLineChart(countryData));

        // Bar Chart
        const yearData = countryData.filter(d => d.year == selectedYear);
        createChart(section, `${country.toLowerCase()}-bar-chart`, generateBarChart(yearData, selectedYear));

        // Area Chart
        createChart(section, `${country.toLowerCase()}-area-chart`, generateAreaChart(countryData));

        container.appendChild(section);
    });
}

function createChart(container, id, plotData) {
    const div = document.createElement('div');
    div.className = "bg-white p-6 rounded-lg shadow mb-6";
    const chartDiv = document.createElement('div');
    chartDiv.id = id;
    chartDiv.style.height = "400px";
    div.appendChild(chartDiv);
    container.appendChild(div);
    Plotly.newPlot(id, plotData.data, plotData.layout);
}

function generateLineChart(data) {
    const sectors = [...new Set(data.map(d => d.sector))];
    const traces = sectors.map(sector => {
        const filtered = data.filter(d => d.sector === sector);
        return {
            x: filtered.map(d => d.year),
            y: filtered.map(d => d.emissions),
            mode: 'lines+markers',
            name: sector
        };
    });
    return {
        data: traces,
        layout: { title: 'Emissions Over Time' }
    };
}

function generateBarChart(data, year) {
    return {
        data: [{
            x: data.map(d => d.sector),
            y: data.map(d => d.emissions),
            type: 'bar'
        }],
        layout: { title: `Emissions in ${year}` }
    };
}

function generateAreaChart(data) {
    const sectors = [...new Set(data.map(d => d.sector))];
    const traces = sectors.map(sector => {
        const filtered = data.filter(d => d.sector === sector);
        return {
            x: filtered.map(d => d.year),
            y: filtered.map(d => d.emissions),
            stackgroup: 'one',
            name: sector,
            type: 'scatter',
            mode: 'none'
        };
    });
    return {
        data: traces,
        layout: { title: 'Stacked Emissions Area Chart' }
    };
}

async function loadCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(',');
        return {
            year: parseInt(values[0]),
            country: values[1],
            sector: values[2],
            emissions: parseFloat(values[3])
        };
    });
}

  


// Exportar las funciones para pruebas
module.exports = {
  toggleMenu,
  initializeTheme,
  toggleDarkMode,
  setupModalLinks,
  setupCloseButtons,
  setupOutsideClickToClose
};

