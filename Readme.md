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