//a esto se le llama una funcion pura en programacion funcional, porque no depende nada que este afuera de la funcion.
//esta funcion deberia de  
function saludar(texto){

    return "hola "+texto;

}

let prefix ="hola ";

//a esto se le llama funcion in-pura en programacion funcional, porque ya depende de la variable prefix. 
function saludar2(texto){//funcion de primer nivel

    return prefix+texto;
}

//esta seria una funcion puramente funcional, y hace referencia a saludar2
//una funcion mas dinamica sin necesidad de tener variables globales, variables de entorno
function mensaje(prefijo,formateador){
    
    return function(texto){//funcion anonima porque no le ponemos un nombre

        return formateador(prefijo,texto);
    }
}

//equivalente de la function mensaje de funcion en arrow functions
//const mensaje = (prefijo,formateador) => (texto) => formateador(prefijo,texto);

//esta es equivalente a la funcion mensaje
//limitantes que cuando son utilizadas como constantes deben de ser declaradas antes de ser usadas
const formatoBienvenida = function(prefijo,texto){ //funciones declaradas como constantes o variables
    //return "!" + prefijo + " " + texto + "!";
    return `! ${prefijo}  ${texto} !`;
}

const formatoDespedida = (prefijo,texto) => prefijo + texto + "... :(";//arrow functions 
//una de las mejores practicas de la programacion funcional es que hagamos funciones tan pequenhas y funcionales, que declaremos siempre arrow functions

const bienvenida = mensaje("hola", formatoBienvenida);

//const despedida = mensaje("adios", formatoDespedida);
//suele suceder que a veces las arrow functions no sean declaradas sino esten directamente definidas sustituyendo al argument
//usualmente se utilizan para funciones pequenhas 
const despedida = mensaje("adios", (prefijo,texto) => `${prefijo}  ${texto} ... :(`);

//puedo crear funciones que devuelvan funciones, o puedo tener variables que se les pueda asignar una funcion

console.log(bienvenida("mundo"));

prefix="adios ";
console.log(despedida("mundo"));