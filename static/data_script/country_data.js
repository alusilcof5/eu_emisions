const countryCodeToName = {
  "AT": "Austria",
  "BE": "Belgium",
  "BG": "Bulgaria",
  "CH": "Switzerland",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DE": "Germany",
  "DK": "Denmark",
  "EE": "Estonia",
  "ES": "Spain",
  "FI": "Finland",
  "FR": "France",
  "GB": "United Kingdom",
  "GR": "Greece",
  "HR": "Croatia",
  "HU": "Hungary",
  "IE": "Ireland",
  "IS": "Iceland",
  "IT": "Italy",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "LV": "Latvia",
  "MT": "Malta",
  "NL": "Netherlands",
  "NO": "Norway",
  "PL": "Poland",
  "PT": "Portugal",
  "RO": "Romania",
  "SE": "Sweden",
  "SI": "Slovenia",
  "SK": "Slovakia",
  "EU27_2020": "European Union (27 countries, 2020)"
};

const csvUrl = '/static/data_script/data.csv';

// Function to parse CSV data

function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(row => {
    const values = row.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i]);
    obj.OBS_VALUE = parseFloat(obj.OBS_VALUE);
    obj.TIME_PERIOD = parseInt(obj.TIME_PERIOD);
    return obj;
  });
}

fetch(csvUrl)
  .then(response => response.text())
  .then(csvData => {
    const data = parseCSV(csvData);

    const allowedSectors = [
      "1 - Energy",
      "1.A.3 - Transport",
      "Total emissions",
      "Total net emissions",
      "3 - Agriculture"
    ];

    const years = data.map(d => d.TIME_PERIOD);

    // Agrupar por país y año
    const countryGrouped = {};
    data.forEach(row => {
      if (!allowedSectors.includes(row.Sector_name)) return; 
      const country = row.geo;
      if (!countryGrouped[country]) countryGrouped[country] = {};
      if (!countryGrouped[country][row.TIME_PERIOD]) countryGrouped[country][row.TIME_PERIOD] = 0;
      countryGrouped[country][row.TIME_PERIOD] += row.OBS_VALUE;
    });

    // Estadísticas básicas
    document.getElementById("total-records").textContent = data.length;
    document.getElementById("total-countries").textContent = new Set(data.map(d => d.geo)).size;
    document.getElementById("min-year").textContent = Math.min(...years);
    document.getElementById("max-year").textContent = Math.max(...years);

    // Referencia selector
    const countrySelect = document.getElementById("country-select");

    // Filtrar países, excluir "Europa" o "EU27_2020"
    const countries = Array.from(new Set(data.map(d => d.geo)))
      .filter(c => c !== "Europa" && c !== "EU27_2020")
      .sort();

    // Llenar selector con nombre en inglés
    countries.forEach(code => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = countryCodeToName[code] || code; 
      countrySelect.appendChild(option);
    });

    // Función para dibujar gráfico con nombres en inglés
    function drawChart(selectedCountry = null) {
      const traces = [];

      if (selectedCountry && countryGrouped[selectedCountry]) {
        const years = Object.keys(countryGrouped[selectedCountry]).sort((a, b) => a - b);
        traces.push({
          x: years,
          y: years.map(y => countryGrouped[selectedCountry][y]),
          name: countryCodeToName[selectedCountry] || selectedCountry,
          mode: 'lines+markers',
          type: 'scatter'
        });
      }

      Plotly.newPlot("chart", traces, {
        title: 'Evolución de Emisiones por País',
        xaxis: { title: 'Año' },
        yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
        legend: { orientation: 'h' }
      });
    }

    // Evento cambio en selector
    countrySelect.addEventListener("change", () => {
      drawChart(countrySelect.value);
    });

    drawChart(); // inicial: sin país seleccionado
  })
  .catch(error => {
    console.error("Error cargando CSV:", error);
  });
