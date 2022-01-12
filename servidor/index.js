import express from "express";

const app = express();
const productos = [
    {
        codigo:1,
        nombre: "producto 1",
        precio: 100,
        cantidad: 10
    },
    {
        codigo:2,
        nombre: "producto 2",
        precio: 50,
        cantidad: 10
    }, 
];

app.use(logs);
app.get("/", (req, res) => res.send("<h1> API de productos </h1>"));

app.get("/productos", isAuthenticated, (req, res) => res.json(productos));

app.listen(5000, ()=>{
    console.log("Servidor express escuchando puerto 5000");
});

function isAuthenticated(req, res, next){
    
    const auth = req.headers.authorization;
    if(auth == "hola-mundo"){
        next();
    }else{
        res.status(401);
        res.send("Not authorized");
    }
}

function logs(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}