# Ejemplo usando Webpack 5 (YT midudev)
https://www.youtube.com/watch?v=FMNuTj89RzU

# Getting started
1. Inicializar proyecto con `npm init`
2. Crear ficheros `./src/index.js` y `./src/utils.js`
3. Instalar webpack con:
```
npm install --save-dev webpack webpack-cli
```
4. Añadimos un script en el package.json para construir el proyecto:
```
  ...
  "scripts": {
    "build": "webpack --mode=development",
    ...
```
5. Ejecutamos `npm run build` para generar los ficheros en ./dist
6. Podríamos ejecutarla con Node directamente: `node dist/main.js`

Por defecto, al construir la aplicación irá a buscar a ./src/index.js como punto de entrada a la aplicación y exportará
este paquete a `./dist` como un fichero `main.js`

En modo desarrollo (usando el flag `--mode=development`) el fichero main.js contiene bastantes cosas para debug y demás.

# Configuración personalizada de Webpack

Utilizaremos el fichero webpack.config.js

# Usando React
1. Instalamos las dependencias de React con: `npm install react react-dom -E`
2. Creamos el fichero App.js y lo usamos en el index.js
3. Ahora, para que webpack sea capaz de entender JSX (lo que se usa en App.js) debemos usar un Loader o Preprocesador.
Usaremos el Loader de 'Babel':
   1. lo tenemos que declarar como módulo en el fichero de configuración de Webpack:
   ```
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            ]
        }
   ```
   2. Instalamos las dependencias necesarias de Babel:
   ```
   npm install @babel/core babel-loader @babel/preset-react --save-dev
   ```
   

## Otros loaders
Tenemos Loaders para otras necesidades:
* ts loader: Para TypeScript
* sass loader: Para SASS
* svg loader: Para SVG
* null loader: Al importarlo, ignora