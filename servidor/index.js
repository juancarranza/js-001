import http from "http";
//const http = require("http");

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write("<h1> Hola mundo desde Node usando http</h1>");
    res.end();
});

server.listen(5000, () => {
    console.log("Servidor escuchando en puerto 5000");
});

//console.log("window: ", window);
//console.log("document: ", document);
//console.log("miVariable: ", window.miVariable);


//console.log("dirname: ", __dirname);
//console.log("filename: ",__filename);
//console.log("process: ", process.argv);

/**
 * Librerias mas utilizadas
 * HTTP
 * OS -> sistema operativo
 * Path
 * File system
 */