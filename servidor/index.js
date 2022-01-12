import express from "express";
import bodyParser from "body-parser";

const app = express();

let lastId=0;
const productos = [
   
];


app.use(bodyParser.json({type: 'application/json'}));
app.use(logs);

app.get("/", (req, res) => res.send("<h1> API de productos </h1>"));

app.get("/productos", (req, res) => res.json(productos));
app.post("/productos",(req, res) => {
    console.log("body: ", req.body);
    lastId++;
    const producto = {...req.body, codigo: lastId };
    productos.push(producto);
    res.status(201);
    res.json({producto});
});


app.listen(5000, ()=>{
    console.log("Servidor express escuchando puerto 5000");
});

/* function isAuthenticated(req, res, next){
    
    const auth = req.headers.authorization;
    if(auth == "hola-mundo"){
        next();
    }else{
        res.status(401);
        res.send("Not authorized");
    }
} */

function logs(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}