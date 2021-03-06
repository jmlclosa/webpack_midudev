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
   
## Visualizar el resultado
Podemos crear un index.html en la carpeta ./dist con lo siguiente dentro del `<body>`:
```
<div id="root"></div>
<script src="main.js"></script>
```   

## Otros loaders
Tenemos Loaders para otras necesidades:
* ts loader: Para TypeScript
* sass loader: Para SASS
* svg loader: Para SVG
* null loader: Al importarlo, ignora


# Refinando código

**El uso de `import React from 'react'` está desaconsejado**. ¿Cómo lo hacemos?

Añadir una configuración al 'babel-loader':
```
                    presets: [
                        [
                            '@babel/preset-react',
                            {
                                runtime: 'automatic'
                            }
                        ]
                    ]
```

Ahora ya podemos eliminar los import de React.

# Añadiendo CSS

1. Creamos un fichero ./src/styles.css
2. No podemos hacer un `import styles.css` en App.js... debemos añadir un Loader de CSS a webpack.
   1. Creamos una `ruleForStyles` con 2 Loaders:
      ```
      ```
      * style-loader para entender el import
      * css-loader para que, una vez entendido, si usamos recursos del proyecto en el CSS, los resuelve
   2. Lo instalamos 
      ```
      npm install style-loader css-loader --save-dev
      ```
3. Ejecutamos `npm run build`


# Hacer que el HTML sea autogenerado (por un plugin de Webpack)

1. Instalamos el plugin con 
```
npm install html-webpack-plugin --save-dev
```
2. Lo usamos en webpack.config.js
3. Movemos el index.html de ./dist a ./src y le quitamos el import del main.js, que lo hará automáticamente
4. Compilamos


# Usar un entorno de desarrollo de Webpack

Para evitarnos estar todo el tiempo compilando y demás:
1. Creamos un script "dev":
```
    "dev": "webpack serve --mode=development",
```
2. Ejecutamos `npm run dev` y le decimos que si a instalar la dependencia 'webpack-dev-server'
3. Abrimos la URL que nos indica
4. Ahora, cualquier cambio que hagamos en un fichero, se reflejará automáticamente en el navegador al guardar

## Configuraciones extra del devServer
En el webpack.config.js podemos configurar cosas como:
```
...
devServer: {
  open: true, // Abrimos el navegador al arrancar el dev-server
  port: 3000,
  overlay: true, // Crea un overlay con los errores en el mismo navegador ( No funciona !)
  compress: true
}
```


# Usando source maps

Para mejorar la trazabilidad de errores y ver en el navegador las referencias al código fuente que 
provocan los errores. 

Sin esto, veríamos referencias al fichero main.js y a líneas que no corresponden con nuestro código fuente.

**NO USAR PARA PRODUCCIÓN** obviamente...

1. Añadimos en webpack.config.js:
```
    ...
    devtool: 'source-map'
```


# Compilando para producción

Podemos cambiar el script `build` o crear uno nuevo con el modo `--mode=production`

Esto generará una build con el código minimizado, etc.

## Hashing de archivos

Si metiésemos una caché a los ficheros, podríamos tener problemas...

Podemos configurar que en desarrollo no tengamos un hash de fichero pero en producción si:
1. En el fichero webpack.config.js configuraremos el output en base a los argumentos recibidos:
```
module.exports = (env, argv) => {
    const {mode} = argv
    const isProduction = mode === 'production'
    return {
        // entry: './src/index.js',
        output: {
            //     path: path.resolve(__dirname, 'build')
            filename: isProduction ? '[name].[contenthash].js' : 'main.js'
        },
```
   * argv: Recibe los argumentos del script, entre ellos el 'mode' con el valor 'production' o 'development'
   * Si estamos en producción, construiremos el nombre del fichero con las variables "mágicas" `[name]` y `[contenthash]`
   * `[contenthash]` generará un hash en base al contenido del fichero

De esta forma, podemos cachear los ficheros para siempre, porque cambiarán siempre que cambie el contenido.