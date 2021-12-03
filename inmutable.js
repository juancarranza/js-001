/*
    Inmutabilidad: significa que no cambiemos los valores de nuestros objetos sino que creemos copias de los mismos para hacer el manejo de adecuado de los mismos. 
    Como buena practica se utilizara esto debido a que esto nos permite tener un mayor control de los cambios, ya que de esta manera podemos 
    saber cuando nuestro objeto va a cambiar y cuando solo es una copia de este y solo se modifica la copia. Ya que solo comparamos la referencia de los objetos
    y no validamos propiedad por propiedad, es mucho mas eficiente.

    En Javascript en los objetos podemos tener anidados objetos a los mismos.

*/

const juan = {
    nombre:"Juan",
    apellido:"Carranza",
    edad:30,
    direccion:{
        departamento:"Guatemala",
        municipio:"Amatitlan"
    }
};

//juan.apellido="Perez";
//a pesar de ser una constante podemos cambiar el apellido. 
//En Javascript las constantes aplican para el valor como tal de la referencia inicial
//es decir si nosotros queremos hacer algo como lo siguiente:
/* juan = {
    nombre:"Jose",
    apellido:"Rodriguez",
    edad:31
};
O
juan = 39;

esto no lo va a permitir javascript, ya que no podemos hacer referencia a un objeto distinto*/

//const juan2=juan; // en este hace referencia al objeto y cuando se modifica algun atributo cambian los 2 objetos ya que no se hizo una copia

//const juan2=Object.assign({},juan);//aqui realizamos una copia del objeto
//juan2.apellido="Perez";
//const juan2=Object.assign({},juan,{apellido:"Perez"});//aqui realizamos una copia del objeto
//const juan2={...juan, apellido:"Perez"};// '...' -> Operador llamado 'Spread'. El va a tomar todas las propiedades del objeto y va a sobreescribir las propiedades que definamos
//const juan2={...juan, apellido:"Perez", telefono:"1234"};// '...' -> Operador llamado 'Spread'. El va a tomar todas las propiedades del objeto y va a sobreescribir las propiedades que definamos
const juan2={
    ...juan, 
    apellido:"Perez", 
    telefono:"1234",
    direccion:{
        ...juan.direccion,
        municipio:"Villa Nueva",
        aldea:"Aldea1"
    }
};// '...' -> Operador llamado 'Spread'. El va a tomar todas las propiedades del objeto y va a sobreescribir las propiedades que definamos
//juan2.direccion.municipio="Villa Nueva";

/* console.log("juan: ",juan);
console.log("juan 2:",juan2); */

// --------------------------------Arreglos Inmutables---------------------------
const numeros = [1,2,3];
//const numeros2= numeros;//solo hace referencia
const numeros2= [0,...numeros,4];//crea una copia

//ejemplo para ingresar un numero entre 1 y 2
const index=numeros.indexOf(2);
const numeros3=[
    ...numeros.slice(0,index),
    1.5,
    ...numeros.slice(index)
];

//eliminar
const numeros4=numeros.filter(x=> x != 2);//arrow function

const numeros5=numeros.map(x => x == 2 ? 100 : x);// if ternario x==2?100:x
/* 
esta expresion es equivalente arrow function de arriba
function reemplazar2Por100{
    //if equivalente al ternario
    if(x==2){
        return 100;
    }else{
        return x;
    } 
}*/

console.log("numeros: ",numeros);
console.log("numeros2: ",numeros2);
console.log("numeros3: ",numeros3);
console.log("numeros4: ",numeros4);
console.log("numeros5: ",numeros5);