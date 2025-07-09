document.addEventListener('DOMContentLoaded', () => {
    const csvUrl = '/static/data_script/data.csv';

    // Lista de los 27 países de la UE (por código ISO)
    const euCountries = new Set([
        "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
        "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
        "SI", "ES", "SE"
    ]);

    function parseCSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(row => {
            const values = row.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i]);
            obj.Year = parseInt(obj.TIME_PERIOD);  // Ajusta si el año está en otra columna
            obj.Country = obj.geo;                 // Código ISO del país
            obj.Total_Emissions_UNFCCC = parseFloat(obj.OBS_VALUE); // Ajuste según tu CSV
            return obj;
        });
    }

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvData => {
            const data = parseCSV(csvData);
            const totalEmissionsEurope = {};
            const uniqueCountries = new Set();

            data.forEach(row => {
                if (
                    euCountries.has(row.Country) &&
                    !isNaN(row.Total_Emissions_UNFCCC)
                ) {
                    if (!totalEmissionsEurope[row.Year]) {
                        totalEmissionsEurope[row.Year] = 0;
                    }
                    totalEmissionsEurope[row.Year] += row.Total_Emissions_UNFCCC;
                    uniqueCountries.add(row.Country);
                }
            });

            const yearsInData = Array.from(new Set(data.map(d => d.Year))).sort((a, b) => a - b);

            document.getElementById("total-records").textContent = data.length;
            document.getElementById("total-countries").textContent = uniqueCountries.size;
            document.getElementById("min-year").textContent = Math.min(...yearsInData);
            document.getElementById("max-year").textContent = Math.max(...yearsInData);

            drawChart(totalEmissionsEurope);
        })
        .catch(error => {
            console.error("Error cargando CSV:", error);
        });

    function drawChart(totalEmissionsEurope) {
        const euYears = Object.keys(totalEmissionsEurope).sort((a, b) => a - b);
        const trace = {
            x: euYears,
            y: euYears.map(year => totalEmissionsEurope[year]),
            name: "Emisiones Totales UE",
            mode: 'lines+markers',
            type: 'scatter',
            line: { color: '#0074D9' }
        };

        Plotly.newPlot("chart", [trace], {
            title: 'Evolución total anual de emisiones en la Unión Europea',
            xaxis: { title: 'Año' },
            yaxis: { title: 'Emisiones (Gg CO₂ eq)' },
            legend: { orientation: 'h' }
        });
    }
});
