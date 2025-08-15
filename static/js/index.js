    function calculateCarbonFootprint(event) {
      event.preventDefault();
      const electricity = parseFloat(document.getElementById('electricity').value) || 0;
      const gasoline = parseFloat(document.getElementById('gasoline').value) || 0;
      const beef = parseFloat(document.getElementById('beef').value) || 0;
      const pork = parseFloat(document.getElementById('pork').value) || 0;
      const chicken = parseFloat(document.getElementById('chicken').value) || 0;
      const vegetables = parseFloat(document.getElementById('vegetables').value) || 0;
      const transport = parseFloat(document.getElementById('transport').value) || 0;

      // Factores de emisión (en kg CO₂e)
      const electricityFactor = 0.4; // kg CO₂e por kWh
      const gasolineFactor = 2.31; // kg CO₂e por litro
      const foodFactors = {
        beef: 27, // kg CO₂e por kg
        pork: 12,
        chicken: 6.9,
        vegetables: 2
      };
      const transportFactor = 0.115; // kg CO₂e por km

      // Cálculo de emisiones
      const emissionsElectricity = electricity * electricityFactor;
      const emissionsGasoline = gasoline * gasolineFactor;
      const emissionsFood = (beef * foodFactors.beef) + (pork * foodFactors.pork) +
                           (chicken * foodFactors.chicken) + (vegetables * foodFactors.vegetables);
      const emissionsTransport = transport * transportFactor;

      const totalEmissions = emissionsElectricity + emissionsGasoline + emissionsFood + emissionsTransport;

      // Mostrar resultado
      document.getElementById('result').innerHTML = `
        <h3>Resultado</h3>
        <p>Electricidad: ${emissionsElectricity.toFixed(2)} kg CO₂e</p>
        <p>Gasolina: ${emissionsGasoline.toFixed(2)} kg CO₂e</p>
        <p>Alimentación: ${emissionsFood.toFixed(2)} kg CO₂e</p>
        <p>Transporte: ${emissionsTransport.toFixed(2)} kg CO₂e</p>
        <p><strong>🌍 Tu huella de carbono anual estimada es: ${(totalEmissions / 1000).toFixed(2)} toneladas de CO₂e</strong></p>
      `;
    }

    // Funcionalidad para los desplegables de FAQ
    document.querySelectorAll('.faq-question').forEach(item => {
      item.addEventListener('click', () => {
        const faqItem = item.parentElement;
        faqItem.classList.toggle('active');
      });
    });
  