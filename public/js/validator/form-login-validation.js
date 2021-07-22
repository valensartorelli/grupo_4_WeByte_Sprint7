window.addEventListener("load", function(){

    // Capturar elementos
    
    const form = document.querySelector("#form-login");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    
        
    // Eventos
    form.addEventListener('submit', function(e){
        //e.preventDefault();
        //alert("entre aca!")
        //alert(rol)

        let hasErrors = {
            email: emailValidator(),
            password: passwordValidator()
        }
        
    // Si hay errores, prevengo la accion por defecto
        if ( hasErrors.email || hasErrors.password ) e.preventDefault();
    });
    
    // Llamo a las funciones
    email.addEventListener('blur', emailValidator);
    password.addEventListener('blur', passwordValidator);
    
    // Funciones 
    writeMsg = ( ...arrToWrite ) => {
        arrToWrite.forEach( elemToWrite => {
            document.getElementById(elemToWrite.id).innerText = elemToWrite.msg;
        });
    }
    
    function emailValidator () {
        let id = 'email_error';
        let regexEmail = /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (email.value == '' || email.value == null) {
            writeMsg( { id, msg: 'El email no puede estar vacío' } );
            email.classList.add('is-invalid');
            return true
        } else if (!email.value.match(regexEmail)) {
            writeMsg( { id, msg: 'El email debe ser valido' } );
            email.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        email.classList.remove('is-invalid');
        return false
    }

    function passwordValidator () {
        let id = 'password_error';
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        if (password.value == '' || password.value == null) {
            writeMsg( { id, msg: 'La contraseña no puede estar vacía' } );
            password.classList.add('is-invalid');
            return true
        } else if (!password.value.match(strongRegex)) {
            writeMsg( { id, msg: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial' } );
            password.classList.add('is-invalid');
            return true
        } else if (password.value.length < 8 || password.value.length > 11) {
            writeMsg( { id, msg: 'La contraseña debe tener entre 8 y 11 caracteres' } );
            password.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        password.classList.remove('is-invalid');
        return false
    }
});