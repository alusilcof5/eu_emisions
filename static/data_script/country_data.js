const eu27Countries = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE",
  "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT",
  "RO", "SK", "SI", "ES", "SE"
];

const countryCodeToName = {
  "AT": "Austria",
  "BE": "Belgium",
  "BG": "Bulgaria",
  "HR": "Croatia",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DK": "Denmark",
  "EE": "Estonia",
  "FI": "Finland",
  "FR": "France",
  "DE": "Germany",
  "GR": "Greece",
  "HU": "Hungary",
  "IE": "Ireland",
  "IT": "Italy",
  "LV": "Latvia",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "MT": "Malta",
  "NL": "Netherlands",
  "PL": "Poland",
  "PT": "Portugal",
  "RO": "Romania",
  "SK": "Slovakia",
  "SI": "Slovenia",
  "ES": "Spain",
  "SE": "Sweden"
};

const csvUrl = '/static/data_script/emissions_europe.csv';

function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(row => {
    const values = row.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i]);
    obj.Year = parseInt(obj.Year);
    obj.Total_Emissions_UNFCCC = parseFloat(obj.Total_Emissions_UNFCCC);
    obj.Total_Net_Emissions_UNFCCC = parseFloat(obj.Total_Net_Emissions_UNFCCC);
    return obj;
  });
}

fetch(csvUrl)
  .then(response => response.text())
  .then(csvData => {
    const data = parseCSV(csvData);

    // Filtra solo los países de la UE27
    const filteredData = data.filter(row => eu27Countries.includes(row.Country));

    // Agrupa datos por país y año
    const countryEmissions = {};
    filteredData.forEach(row => {
      const country = row.Country;
      if (!countryEmissions[country]) {
        countryEmissions[country] = {};
      }
      countryEmissions[country][row.Year] = row.Total_Emissions_UNFCCC;
    });

    // Años únicos ordenados
    const allYears = Array.from(new Set(filteredData.map(d => d.Year))).sort((a, b) => a - b);

    // Actualiza estadísticas
    document.getElementById("total-records").textContent = filteredData.length;
    document.getElementById("total-countries").textContent = new Set(filteredData.map(d => d.Country)).size;
    document.getElementById("min-year").textContent = Math.min(...allYears);
    document.getElementById("max-year").textContent = Math.max(...allYears);

    const countrySelect = document.getElementById("country-select");
    countrySelect.innerHTML = '<option value="">Seleccione un país</option>';

    // Ordena países por nombre
    const countries = eu27Countries
      .filter(code => filteredData.some(d => d.Country === code))
      .sort((a, b) => (countryCodeToName[a] || a).localeCompare(countryCodeToName[b] || b));

    // Llena el selector
    countries.forEach(code => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = countryCodeToName[code] || code;
      countrySelect.appendChild(option);
    });

    function drawChart(selectedCountryCode) {
      if (!selectedCountryCode || !countryEmissions[selectedCountryCode]) {
        Plotly.newPlot("chart", [], {
          title: 'Seleccione un país para ver las emisiones',
          xaxis: { title: 'Año' },
          yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
          annotations: [{
            text: 'No hay datos seleccionados',
            xref: 'paper',
            yref: 'paper',
            showarrow: false,
            font: { size: 20, color: '#ccc' }
          }]
        });
        return;
      }

      const years = Object.keys(countryEmissions[selectedCountryCode]).sort((a, b) => a - b);
      const emissions = years.map(year => countryEmissions[selectedCountryCode][year]);

      const trace = {
        x: years,
        y: emissions,
        name: countryCodeToName[selectedCountryCode] || selectedCountryCode,
        mode: 'lines+markers',
        type: 'scatter'
      };

      Plotly.newPlot("chart", [trace], {
        title: `Evolución de Emisiones de ${countryCodeToName[selectedCountryCode] || selectedCountryCode}`,
        xaxis: { title: 'Año' },
        yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
        legend: { orientation: 'h' }
      });
    }

    countrySelect.addEventListener("change", () => {
      drawChart(countrySelect.value);
    });

    // Dibuja el gráfico del primer país por defecto
    if (countries.length > 0) {
      countrySelect.value = countries[0];
      drawChart(countries[0]);
    } else {
      drawChart(null);
    }
  })
  .catch(error => {
    console.error("Error loading CSV:", error);
  });
