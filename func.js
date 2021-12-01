//a esto se le llama una funcion pura en programacion funcional, porque no depende nada que este afuera de la funcion.
//esta funcion deberia de  
function saludar(texto){

    return "hola "+texto;

}

let prefix ="hola ";

//a esto se le llama funcion in-pura en programacion funcional, porque ya depende de la variable prefix. 
function saludar2(texto){

    return prefix+texto;
}

//esta seria una funcion puramente funcional, y hace referencia a saludar2
//una funcion mas dinamica sin necesidad de tener variables globales, variables de entorno
function mensaje(prefijo){
    
    return function(texto){
        return prefijo + " "+texto;
    }
}

const bienvenida = mensaje("hola");
const despedida = mensaje("adios");

//puedo crear funciones que devuelvan funciones, o puedo tener variables que se les pueda asignar una funcion

console.log(bienvenida("mundo"));

prefix="adios ";
console.log(despedida("mundo"));