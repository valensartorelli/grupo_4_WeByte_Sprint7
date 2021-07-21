window.addEventListener("load", function(){

// Capturar elementos

let form = document.querySelector("#form-registro");

    form.addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.querySelector("#name");

    if(name.value == ""){
        alert("El nombre no puede estar vacio")
    }

    });
   

// fin onload
})