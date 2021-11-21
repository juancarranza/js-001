function suma() {
    return 200;
}

console.log(suma());

//changing from variable to constant.
const paragraphs=document.getElementsByTagName("p");
console.log(paragraphs);
if(paragraphs.length>0){
    //new comment
    let paragraph=paragraphs[0];

paragraph.innerText="Cambiando a Bienvenidos al Bootcamp!";

}

