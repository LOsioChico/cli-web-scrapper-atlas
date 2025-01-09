# Challenge: cli web scrapper

Crear una aplicación CLI que retornará el detalle de los anuncios de
[realtyrealtypr](https://www.realityrealtypr.com) en venta para un tipo de
propiedad `HOUSE` o `APARTMENT` (primer argumento) y una página específica
(iniciando desde `0`, segundo argumento). La aplicación debe escribir un json,
con un nombre especificado mediante el tercer argumento en el directorio del
proceso, que es un array de objectos con las propiedades:

- `url` (sin parámetros de busqueda)
- `title`
- `city`
- `price`
- `description`
- `images` (array de strings)
- `flyer` (url del flyer)

## Ejemplo

Para extraer la primera página (página 0) de los apartamentos en el archivo `data.json`:

```bash
# Si se usa javascript
$ node app.js APARTMENT 0 data.json

# Si se usa python
$ python3 app.py APARTMENT 0 data.json
```

Los resultados correspondrían a los cargados [aquí](https://www.realityrealtypr.com/propiedades/venta/?search%5Barea%5D=&search%5Bprice_from%5D=&search%5Bkeywords%5D=&search%5Bproperty_type%5D=&search%5Bproperty_type%5D=Residential%3A5&search%5Bprice_to%5D=)

`data.json` tendría esta forma:

```json
[
  {
    "url": "https://www.realityrealtypr.com/compra-venta/casa/puerto-rico/cayey/bo-toita/166209",
    "title": "Bo. Toita",
    "city": "Cayey",
    "price": "Venta: $140,000",
    "description": "Propiedad de 2 niveles con 4 habitaciones, 2 baños, sala, comedor, balcón al frente, marquesina para 2 autos \"back-to-back\". En la planta de abajo super amplio de 2 habitaciones, 1 baños, comedor, cocina 300 mtrs. de terreno. \"PORQUE VENDEMOS TU PROPIEDAD EN TIEMPO RECORD\". Para ver ésta y más propiedades acceda: www.realityrealtypr.com.",
    "images": [
      "https://s3.amazonaws.com/app-propiedades/166209/1_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/2_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/3_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/4_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/5_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/6_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/7_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/8_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/9_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/10_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/11_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/12_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/13_large.jpg",
      "https://s3.amazonaws.com/app-propiedades/166209/14_large.jpg"
    ],
    "flyer": "https://www.realityrealtypr.com/properties/print/id:166209/broker_id:14011/"
  }
  // ...
]
```

## Requerimientos

- La solución debe implementarse en javascript o python en su totalidad.
- Usar [jsdom](https://www.npmjs.com/package/jsdom), [puppeteer](https://pptr.dev/),
  [selenium](https://www.selenium.dev), [playwright](https://playwright.dev/),
  o cualquier paquete para manipular dom o leer html.

## Consideraciones

- Se puede asumir que los argumentos estarán siempre definidos, por lo tanto no
  es necesaria su validación.
- Se puede usar cualquier herramienta de IA (github copilot, chatgpt, claude).
- Entre más sencilla la solución, mejor.

## Envío de solución

- Si la solución es con javascript, subir a github o gitlab en un repositorio público:
  - Archivos de javascript
  - package.json y package-lock.json
- Si la solucion es con python, subir a github o gitlab en un repositorio público:
  - Archivos de python
  - pyproject.toml
- Enviar como respuesta al correo inicial la url del repositorio.
