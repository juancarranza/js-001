function suma() {
    return 200;
}

console.log(suma());


let paragraphs=document.getElementsByTagName("p");
console.log(paragraphs);
if(paragraphs.length>0){
    //new comment
    let paragraph=paragraphs[0];

paragraph.innerText="Cambiando a Bienvenidos al Bootcamp!";

}

