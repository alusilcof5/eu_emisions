/* const csvUrl = 'static/data_script/data.csv';

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
  .then(response => {
    if (!response.ok) throw new Error("Error cargando CSV: " + response.statusText);
    return response.text();
  })
  .then(csvData => {
    const data = parseCSV(csvData);
    console.log("Datos cargados:", data);

    if (data.length === 0) {
      alert("CSV cargado pero vacío o mal parseado");
      return;
    }

    const allowedSectors = [
      "1 - Energy",
      "1.A.3 - Transport",
      "Total emissions (UNFCCC)",
      "Total net emissions (UNFCCC)",
      "3 - Agriculture",
      "2 - Industrial Processes and Product Use",
      "5 - Waste management",
      "4.H - Other LULUCF",
      "4 - Land Use, Land Use Change and Forestry"
    ];

    // Validar que la columna sector exista
    if (!data[0].hasOwnProperty('Sector_name')) {
      alert("Error: El CSV no contiene la columna 'Sector_name'");
      return;
    }

    const sectoresUnicos = [...new Set(data.map(d => d.Sector_name))];
    console.log("Sectores en CSV:", sectoresUnicos);

    const years = data.map(d => d.TIME_PERIOD);
    const uniqueCountries = new Set(data.map(d => d.geo));

    document.getElementById("total-records").textContent = data.length;
    document.getElementById("total-countries").textContent = uniqueCountries.size;
    document.getElementById("min-year").textContent = Math.min(...years);
    document.getElementById("max-year").textContent = Math.max(...years);

    // Agrupar datos por sector y año
    const groupedBySectorYear = {};
    data.forEach(row => {
      if (!allowedSectors.includes(row.Sector_name)) return;
      if (!groupedBySectorYear[row.Sector_name]) groupedBySectorYear[row.Sector_name] = {};
      if (!groupedBySectorYear[row.Sector_name][row.TIME_PERIOD]) groupedBySectorYear[row.Sector_name][row.TIME_PERIOD] = 0;
      if (!isNaN(row.OBS_VALUE)) groupedBySectorYear[row.Sector_name][row.TIME_PERIOD] += row.OBS_VALUE;
    });

    function drawChart(sector) {
      if (!sector || !groupedBySectorYear[sector]) {
        document.getElementById("chart").innerHTML = "<p>No hay datos para el sector seleccionado.</p>";
        return;
      }

      const sectorYears = Object.keys(groupedBySectorYear[sector]).sort((a, b) => a - b);

      const trace = {
        x: sectorYears,
        y: sectorYears.map(y => groupedBySectorYear[sector][y]),
        name: sector,
        mode: "lines+markers",
        line: { color: "#356d0d" },
        marker: { color: "#356d0d" }
      };

      Plotly.newPlot("chart", [trace], {
        title: `Emisiones - ${sector}`,
        xaxis: { title: 'Año' },
        yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
        legend: { orientation: 'h', x: 0.1, y: -0.2 }
      }, { responsive: true });
    }

    const sectorSelect = document.getElementById("sector-select");
    sectorSelect.disabled = false;

    sectorSelect.addEventListener("change", () => {
      drawChart(sectorSelect.value);
    });

    // Mostrar el primer sector disponible por defecto
    const defaultSector = allowedSectors.find(s => groupedBySectorYear[s]);
    if (defaultSector) {
      sectorSelect.value = defaultSector;
      drawChart(defaultSector);
    } else {
      document.getElementById("chart").innerHTML = "<p>No hay datos disponibles para los sectores permitidos.</p>";
    }

  })
  .catch(err => {
    console.error(err);
    alert("Error cargando datos. Revisa la consola.");
  });
 */