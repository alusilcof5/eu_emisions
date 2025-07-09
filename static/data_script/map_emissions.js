/* const countryCodes = {
  "AT": "Austria", "BE": "Belgium", "BG": "Bulgaria", "CH": "Switzerland",
  "CY": "Cyprus", "CZ": "Czech Republic", "DE": "Germany", "DK": "Denmark",
  "EE": "Estonia", "ES": "Spain", "FI": "Finland", "FR": "France",
  "GR": "Greece", "HR": "Croatia", "HU": "Hungary", "IE": "Ireland",
  "IS": "Iceland", "IT": "Italy", "LT": "Lithuania", "LU": "Luxembourg",
  "LV": "Latvia", "MT": "Malta", "NL": "Netherlands", "NO": "Norway",
  "PL": "Poland", "PT": "Portugal", "RO": "Romania", "SE": "Sweden",
  "SI": "Slovenia", "SK": "Slovakia"
};

function parseNumber(str) {
  if (!str) return NaN;
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    const cols = matches.map(c => c.replace(/^"|"$/g, '').trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i];
    });
    return obj;
  });
}

function plotEmissionsMap(dataset, valueKey, divId, title, colorscale) {
  const latestYear = Math.max(...dataset.map(d => +d['Año'] || 0));

  const filtered = dataset.filter(d =>
    d['Año'] === String(latestYear) &&
    countryCodes[d['País']] &&
    !isNaN(parseNumber(d[valueKey]))
  );

  const locations = filtered.map(d => countryCodes[d['País']]);
  const emissions = filtered.map(d => parseNumber(d[valueKey]));
  const hoverTexts = filtered.map((d, i) =>
    `${locations[i]}<br><b>${emissions[i].toLocaleString()} Gg CO₂ eq</b> (${latestYear})`
  );

  const trace = {
    type: 'choropleth',
    locationmode: 'country names',
    locations,
    z: emissions,
    text: hoverTexts,
    colorscale,
    marker: { line: { color: 'white', width: 0.8 } },
    colorbar: {
      title: 'Emisiones (Gg CO₂ eq)',
      ticksuffix: ' Gg',
      showticksuffix: 'last'
    }
  };

  const layout = {
    title,
    geo: {
      scope: 'europe',
      projection: { type: 'natural earth' },
      showframe: false,
      showcountries: true,
      showlakes: true,
      lakecolor: 'rgb(255,255,255)',
      center: { lat: 54, lon: 15 },
      lonaxis: { range: [-25, 45] },
      lataxis: { range: [34, 72] }
    },
    margin: { t: 50, b: 10, r: 10, l: 10 },
    height: 600
  };

  Plotly.newPlot(divId, [trace], layout);
}

async function loadAndPlot(csvPath) {
  try {
    const response = await fetch(csvPath);
    if (!response.ok) throw new Error(`Error al cargar CSV: ${response.statusText}`);
    const csvText = await response.text();
    const dataset = parseCSV(csvText);

    plotEmissionsMap(
      dataset,
      'Total Emisiones (Gg CO₂ eq)',
      'mapTotal',
      'Emisiones Totales de Carbono en Europa (2023)',
      'Blues' // 🔵 escala de azules
    );

    plotEmissionsMap(
      dataset,
      'Total Neto (Gg CO₂ eq)',
      'mapNet',
      'Emisiones Netas de Carbono en Europa (2023)',
      'YlOrRd' // 🔴 escala cálida
    );

  } catch (error) {
    console.error('Error cargando CSV:', error);
    alert('No se pudo cargar o procesar el archivo CSV.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadAndPlot('data_template/emissions.csv');
});
 */