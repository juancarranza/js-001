function suma() {
    return 200;
}

console.log(suma());

//changing from variable to constant.
const paragraphs=document.getElementsByTagName("p");
console.log(paragraphs);
if(paragraphs.length>0){
    //try to use always const instead of the let or var, because this could bring bugs to our code if someone is using it in another function/code.
    const paragraph=paragraphs[0];
    paragraph.innerText="Cambiando a Bienvenidos al Bootcamp!";

}


if(paragraphs.length>1){
    //try to use always const instead of the let or var, because this could bring bugs to our code if someone is using it in another function/code.
    const paragraph=paragraphs[1];
    const fecha=new Date();
    paragraph.innerText="Cambiando al otro Bienvenidos. Length: "+paragraphs.length+" ("+fecha+")";
}

