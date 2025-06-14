def traducir_templates(carpeta_origen='./templates', carpeta_destino='./templates_en', src='es', dest='en'):
    import os
    from googletrans import Translator
    from bs4 import BeautifulSoup

    translator = Translator()
    os.makedirs(carpeta_destino, exist_ok=True)

    def traducir_texto_html(html_text, src=src, dest=dest):
        soup = BeautifulSoup(html_text, 'html.parser')
        for elem in soup.find_all(text=True):
            texto_original = elem.string.strip()
            if texto_original:
                try:
                    traduccion = translator.translate(texto_original, src=src, dest=dest).text
                    elem.replace_with(traduccion)
                except Exception as e:
                    print(f"Error traduciendo: {texto_original} -> {e}")
        return str(soup)

    for archivo in os.listdir(carpeta_origen):
        if archivo.endswith('.html'):
            ruta_entrada = os.path.join(carpeta_origen, archivo)
            ruta_salida = os.path.join(carpeta_destino, archivo)

            with open(ruta_entrada, 'r', encoding='utf-8') as f:
                contenido = f.read()

            contenido_traducido = traducir_texto_html(contenido, src=src, dest=dest)

            with open(ruta_salida, 'w', encoding='utf-8') as f:
                f.write(contenido_traducido)

            print(f'Traducido: {archivo} -> {ruta_salida}')


if __name__ == '__main__':
    traducir_templates()
