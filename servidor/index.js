import http from "http";
//const http = require("http");

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify([
        {
            codigo: 1,
            nombre: "producto1",
            cantidad: 100
        },
        {
            codigo: 2,
            nombre: "producto2",
            cantidad: 50
        }
    ]));
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