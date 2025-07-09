document.addEventListener('DOMContentLoaded', () => {
    const csvUrl = '/static/data_script/data.csv';

    // Función para parsear el CSV
    function parseCSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(row => {
            const values = row.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i]);
            obj.Year = parseInt(obj.Year);
            obj.Total_Emissions_UNFCCC = parseFloat(obj.Total_Emissions_UNFCCC);
            return obj;
        });
    }

    // Cargar el CSV
    fetch(csvUrl)
        .then(response => response.text())
        .then(csvData => {
            const data = parseCSV(csvData);
            const totalEmissionsEurope = {};
            const uniqueCountries = new Set();

            data.forEach(row => {
                if (!isNaN(row.Total_Emissions_UNFCCC)) {
                    if (!totalEmissionsEurope[row.Year]) {
                        totalEmissionsEurope[row.Year] = 0;
                    }
                    totalEmissionsEurope[row.Year] += row.Total_Emissions_UNFCCC;
                    uniqueCountries.add(row.Country);
                }
            });

            const yearsInData = Array.from(new Set(data.map(d => d.Year))).sort((a, b) => a - b);

            // Actualizar estadísticas
            document.getElementById("total-records").textContent = data.length;
            document.getElementById("total-countries").textContent = uniqueCountries.size;
            document.getElementById("min-year").textContent = Math.min(...yearsInData);
            document.getElementById("max-year").textContent = Math.max(...yearsInData);

            // Dibujar gráfico
            drawChart(totalEmissionsEurope);
        })
        .catch(error => {
            console.error("Error cargando CSV:", error);
        });

    // Función para dibujar el gráfico
    function drawChart(totalEmissionsEurope) {
        const euYears = Object.keys(totalEmissionsEurope).sort((a, b) => a - b);
        const trace = {
            x: euYears,
            y: euYears.map(year => totalEmissionsEurope[year]),
            name: "Emisiones Totales en Europa",
            mode: 'lines+markers',
            type: 'scatter',
            line: { dash: 'solid', color: '#0074D9' }
        };

        Plotly.newPlot("chart", [trace], {
            title: 'Evolución total anual de emisiones en Europa',
            xaxis: { title: 'Año' },
            yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
            legend: { orientation: 'h' }
        });
    }

    // Función para manejar el toggle del menú
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }

    // Inicializar el tema oscuro
    const toggle = document.getElementById('theme-toggle');
    const icon = toggle?.querySelector('i');
    const body = document.body;

    if (toggle && icon) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

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
    } else {
        console.error("No se encontró el botón o el ícono del modo oscuro.");
    }

    // Configurar enlaces de modales
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

    // Configurar botones de cierre de modales
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Cerrar el modal al hacer clic fuera de él
    window.onclick = function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
});
