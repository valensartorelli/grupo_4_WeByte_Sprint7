window.addEventListener("load", function(){

    // Capturar elementos
    
    let form = document.querySelector("#form-category");
    const name = document.getElementById("name");
    
        
    // Eventos
    form.addEventListener('submit', function(e){

        let hasErrors = {
            name: nameValidator()
        }
    
        
    // Si hay errores, prevengo la accion por defecto
        if ( hasErrors.name ) e.preventDefault();
    });
    
    // Llamo a las funciones
    name.addEventListener('blur', nameValidator);
    
    // Funciones 
    writeMsg = ( ...arrToWrite ) => {
        arrToWrite.forEach( elemToWrite => {
            document.getElementById(elemToWrite.id).innerText = elemToWrite.msg;
        });
    }
    
    function nameValidator () {
        let id = 'name_error';
        if (name.value == '' || name.value == null) {
            writeMsg( { id, msg: 'El nombre no puede estar vacío' } );
            firstName.classList.add('is-invalid');
            return true
        } else if (name.value.length < 2) {
            writeMsg( { id, msg: 'El nombre debe tener al menos 2 caracteres' } );
            firstName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        email.classList.remove('is-invalid');
        return false
    }
});