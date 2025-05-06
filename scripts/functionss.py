# functionss.py
import pandas as pd
import matplotlib.pyplot as plt
import os

# Ruta al archivo CSV
CSV_PATH = '/home/factoriaf5/Escritorio/eu_emisions/static/package/co2_emissions_kt_by_country.csv'

# Directorio para guardar las gráficas
IMG_DIR = 'static/img'

def zonas():
    zonas_geograficas = ['Africa Eastern and Southern', 'Africa Western and Central', 'Arab World', 
                        'Central Europe and the Baltics', 'Caribbean small states', 'East Asia & Pacific', 
                        'Europe & Central Asia', 'Euro area', 'European Union', 'Latin America & Caribbean', 
                        'Middle East & North Africa', 'North America', 'OECD members', 
                        'Pacific island small states', 'South Asia', 'Sub-Saharan Africa', 'World']
    return zonas_geograficas

def grafica(nombre, data):
    # Filtrar los datos
    data2 = data[data['country_name'] == nombre]
    
    if data2.empty:
        print(f"No hay datos disponibles para {nombre}")
        return None
    
    # Asegurarse de que 'year' y 'value' sean numéricos
    data2 = data2.copy()
    data2['year'] = pd.to_numeric(data2['year'], errors='coerce')
    data2['value'] = pd.to_numeric(data2['value'], errors='coerce')
    
    # Eliminar filas con valores nulos
    data2 = data2.dropna(subset=['year', 'value'])
    
    if data2.empty:
        print(f"No hay datos válidos para graficar después de limpiar {nombre}")
        return None
    
    # Crear la gráfica
    plt.figure(figsize=(10, 6))
    plt.plot(data2['year'], data2['value'], label='Emisiones de CO2', marker='o')
    plt.title(f'Emisiones de CO2 desde 1960 hasta 2019\n{nombre}')
    plt.xlabel('Año')
    plt.ylabel('Emisiones de CO2 en Kilotones')
    plt.legend()
    plt.grid(True)
    
    # Guardar la gráfica
    os.makedirs(IMG_DIR, exist_ok=True)  # Crear directorio si no existe
    img_filename = f'grafica_{nombre.replace(" ", "_")}.png'
    img_path = os.path.join(IMG_DIR, img_filename)
    plt.savefig(img_path, bbox_inches='tight')
    plt.close()  # Cerrar la figura para liberar memoria
    
    return img_filename