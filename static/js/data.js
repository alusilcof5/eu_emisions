const csvUrl = 'data.csv';

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

    const years = data.map(d => d.TIME_PERIOD);

    // Total emisiones Europa por año (sumar todas las OBS_VALUE válidas)
    const totalEU = {};
    data.forEach(row => {
      if (!isNaN(row.OBS_VALUE)) {
        if (!totalEU[row.TIME_PERIOD]) totalEU[row.TIME_PERIOD] = 0;
        totalEU[row.TIME_PERIOD] += row.OBS_VALUE;
      }
    });

    // Estadísticas
    document.getElementById("total-records").textContent = data.length;
    document.getElementById("total-countries").textContent = new Set(data.map(d => d.geo)).size;
    document.getElementById("min-year").textContent = Math.min(...years);
    document.getElementById("max-year").textContent = Math.max(...years);

    // Dibujar gráfico solo con total Europa
    function drawChart() {
      const euYears = Object.keys(totalEU).sort((a, b) => a - b);
      const trace = {
        x: euYears,
        y: euYears.map(y => totalEU[y]),
        name: "Europa (Total)",
        mode: 'lines+markers',
        type: 'scatter',
        line: { dash: 'solid', color: '#0074D9' }
      };

      Plotly.newPlot("chart", [trace], {
        title: 'Evolución total de emisiones de GEI en Europa',
        xaxis: { title: 'Año' },
        yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
        legend: { orientation: 'h' }
      });
    }

    drawChart();
  })
  .catch(error => {
    console.error("Error cargando CSV:", error);
  });
