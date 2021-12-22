//aqui se utilizan los modulos en javascript, como reutilizamos el codigo de javascript que tenemos en varios archivos. 
//import "./js/app";


/**
 *****Pasos para instalar e implementar React
 npm install react react-dom
 npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader

 *****Configurar webpack
 creamos un archivo webpack.config.js

 ****Linkear webpack con babel
 creamos un archivo babel.config.json


*/

import React from "react";
import ReactDom from "react-dom";
import "./index.css";//para que esto funcione seguir los siguientes pasos 
/**
 * npm install -D style-loader css-loader 
 * se agrega esto al webpack.config.json
 * {
        use: ["styles-loader", "css-loader"],
        test: /.css$/
   }
 * 
 * 
 */
import logo from "./logo.PNG";


const container =document.getElementById("root");
const App = () => (
    <div className="app">
        <h1>Hola mundo desde React!</h1>
        <img src = {logo} />
    </div>
);

ReactDom.render(<App />, container);
