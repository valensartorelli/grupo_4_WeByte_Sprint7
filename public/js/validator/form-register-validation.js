window.addEventListener("load", function(){
    
    // Capturo elementos
    let form = document.querySelector("#form-registro");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let userName = document.getElementById("userName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let repassword = document.getElementById("repassword");
    let avatar = document.getElementById("avatar");
    let rol = document.querySelector('#rolId');
    let rolIndex = document.getElementById("rolId").value;
    let btnReg = document.getElementById("btn-reg");
    let errorElement = document.getElementById('error');

    const acceptedExtensions = ['jpg', 'png', 'gif', 'jpeg', 'JPG', 'PNG', 'GIF', 'JPEG'];

    // Eventos
    form.addEventListener('submit', function(e){
        //e.preventDefault();
        //alert("entre aca!")
        //alert(rol)

        let hasErrors = {
            firstName: nameValidator(),
            lastName: lastNameValidator(),
            userName: userNameValidator(),
            email: emailValidator(),
            password: passwordValidator(),
            repassword: repasswordValidator(),
            avatar: avatarValidator(),
            rol: rolValidator()
        }


        // Si hay errores, prevengo la accion por defecto
        if ( hasErrors.rol || hasErrors.firstName || hasErrors.lastName || hasErrors.userName || hasErrors.email || hasErrors.password || hasErrors.repassword || hasErrors.avatar
            ) e.preventDefault();
    });

    // Llamo a las funciones
    firstName.addEventListener('blur', nameValidator);
    lastName.addEventListener('blur', lastNameValidator);
    userName.addEventListener('blur', userNameValidator);
    email.addEventListener('blur', emailValidator);
    password.addEventListener('blur', passwordValidator);
    repassword.addEventListener('blur', repasswordValidator);
    avatar.addEventListener('change', avatarValidator);
    rol.addEventListener('blur', rolValidator);

    // Escribe el mensaje
    writeMsg = ( ...arrToWrite ) => {
        arrToWrite.forEach( elemToWrite => {
            document.getElementById(elemToWrite.id).innerText = elemToWrite.msg;
        });
    }

    // Funciones 
    function nameValidator () {
        let id = 'firstName_error';
        if (firstName.value == '' || firstName.value == null) {
            writeMsg( { id, msg: 'El nombre no puede estar vacío' } );
            firstName.classList.add('is-invalid');
            return true
        } else if (firstName.value.length < 2) {
            writeMsg( { id, msg: 'El nombre debe tener al menos 2 caracteres' } );
            firstName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        firstName.classList.remove('is-invalid');
        return false
    }

    function lastNameValidator () {
        let id = 'lastName_error';
        if (lastName.value == '' || lastName.value == null) {
            writeMsg( { id, msg: 'El apellido no puede estar vacío' } );
            lastName.classList.add('is-invalid');
            return true
        } else if (lastName.value.length < 2) {
            writeMsg( { id, msg: 'El apellido debe tener al menos 2 caracteres' } );
            lastName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        lastName.classList.remove('is-invalid');
        return false
    }

    function userNameValidator () {
        let id = 'userName_error';
        if (userName.value == '' || userName.value == null) {
            writeMsg( { id, msg: 'El usuario no puede estar vacío' } );
            userName.classList.add('is-invalid');
            return true
        } else if (userName.value.length < 2) {
            writeMsg( { id, msg: 'El usuario debe tener al menos 2 caracteres' } );
            userName.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        userName.classList.remove('is-invalid');
        return false
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

    function repasswordValidator () {
        let id = 'repassword_error';
        if (repassword.value == '' || repassword.value == null) {
            writeMsg( { id, msg: 'Este campo no puede estar vacío' } );
            repassword.classList.add('is-invalid');
            return true
        } else if (repassword.value !== password.value) {
            writeMsg( { id, msg: 'Las contraseñas no coinciden' } );
            repassword.classList.add('is-invalid');
            return true
        }
        writeMsg( { id, msg: '' } );
        repassword.classList.remove('is-invalid');
        return false
    }

    function avatarValidator () {
        const avatarError = document.querySelector("#avatar_error");
        let feedback = ''; 
        console.log(avatar);
        console.log("-----------------------");
     
        if (avatar) {
            let filename = avatar.value;
            let fileExtension = filename.split(".").pop();
            if (!acceptedExtensions.includes(fileExtension)) {
                feedback = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}` 
                avatar.classList.add('is-invalid');   
            }
        }
        if (feedback) {
            avatarError.innerText = feedback;
            hasErrors.avatar = feedback;
        } else{
            avatarError.innerText = ''; 
            avatar.classList.remove('is-invalid');  
        }
    }

    function rolValidator () {
        let errorRol = document.querySelector("#rol_error");
        //alert("Rol: " + rol);
        //alert("Rol index: " + rolIndex);

        if( rol.value == null || rol.value == 0 ) {	
            errorRol.innerText = 'Debe seleccionar un rol de usuario';
            rol.classList.add('is-invalid');   
            return true;
        } else {
            errorRol.innerText = '';
            rol.classList.remove('is-invalid'); 
            return false;
        }
    }


})