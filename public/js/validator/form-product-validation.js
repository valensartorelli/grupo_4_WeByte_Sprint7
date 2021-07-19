window.addEventListener("load", function(){

// Capturar elementos

const form = document.querySelector("#product");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const descriptionExt = document.querySelector("#extended_description");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");
// const image1 = document.getElementById('image1');
// const brand = document.getElementsByName('brand');
//const category = document.getElementsByName("categoryId");
// const color = document.getElementsByName('color');
// const size = document.getElementsByName('size');

// Eventos
form.addEventListener('submit', function (e) {
    let hasErrors = { 
        //category: true,
        category: categoryValidator(),
        // brand: true,
        name: nameValidator(),
        description: descriptionValidator(),
        descriptionExt: descriptionExtValidator(),
        price: priceValidator(),    
        // color: true,
        // size: true,
        stock: stockValidator(),
        // image: imageValidator(),
        // visivility: true
    };
    
    // Hay errores hasta que se demuestre lo contrario.
    //category.forEach(category => { hasErrors.category = category.selected ? false : hasErrors.category });
    // brand.forEach(brand => { hasErrors.brand = brand.selected ? false : hasErrors.brand });
    // color.forEach(color => { hasErrors.color = color.selected ? false : hasErrors.color });
    // size.forEach(size => { hasErrors.size = size.selected ? false : hasErrors.size });
    // visibility.forEach(visibility => { hasErrors.visibility = visibility.selected ? false : hasErrors.visibility });

    if ( hasErrors.category ||
        hasErrors.name || hasErrors.description || hasErrors.descriptionExt || hasErrors.price || hasErrors.stock
    ) e.preventDefault();

    // document.getElementById('brand_error').innerText = hasErrors.brand ? 'Debe seleccionar una marca': '';
    //document.getElementById('category_error').innerText = hasErrors.category ? 'Debe seleccionar una categoríaaaa' : '';
    // document.getElementById('color_error').innerText = hasErrors.color ? 'Debe seleccionar un color' : '';
    // document.getElementById('size_error').innerText = hasErrors.size ? 'Debe seleccionar un talle' : '';
    // document.getElementById('visibility_error').innerText = hasErrors.visibility ? 'Debe seleccionar un estado': '';
    

});

name.addEventListener('blur', nameValidator);
description.addEventListener('blur', descriptionValidator);
descriptionExt.addEventListener('blur', descriptionExtValidator);
price.addEventListener('blur', priceValidator);
stock.addEventListener('blur', stockValidator);
// inputImage.addEventListener('change', imageValidator);


// Funciones 
writeMsg = ( ...arrToWrite ) => {
    arrToWrite.forEach( elemToWrite => {
        document.getElementById(elemToWrite.id).innerText = elemToWrite.msg;
    });
}

function nameValidator () {
    let id = 'name_error';
    if (!name.value) {
        writeMsg( { id, msg: 'El nombre no puede estar vacío' } );
        name.classList.add('error-input');
        return true
    } else if (name.value.length < 5) {
        writeMsg( { id, msg: 'El nombre debe tener al menos 5 caracteres' } );
        name.classList.add('error-input');
        return true
    }
    writeMsg( { id, msg: '' } );
    name.classList.remove('error-input');
    return false
}

function descriptionValidator () {
    let id = 'description_error';
    if (!description.value) {
        writeMsg( { id, msg: 'La descripción no puede estar vacía' } );
        description.classList.add('error-input');
        return true
    } else if (description.value.length < 20) {
        writeMsg( { id, msg: 'La descripción debe tener al menos 20 caracteres' } );
        description.classList.add('error-input');
        return true
    }
    writeMsg( { id, msg: '' } );
    description.classList.remove('error-input');
    return false
}

function descriptionExtValidator () {
    let id = 'descriptionExt_error';
    if (!descriptionExt.value) {
        writeMsg( { id, msg: 'La descripción ampliada no puede estar vacía' } );
        descriptionExt.classList.add('error-input');
        return true
    } else if (descriptionExt.value.length < 20) {
        writeMsg( { id, msg: 'La descripción ampliada debe tener al menos 20 caracteres' } );
        descriptionExt.classList.add('error-input');
        return true
    }
    writeMsg( { id, msg: '' } );
    descriptionExt.classList.remove('error-input');
    return false
}


function priceValidator () {
    let id = 'price_error';
    if (!price.value) {
        writeMsg( { id, msg: 'El precio no puede estar vacío' } );
        price.classList.add('error-input');
        return true
    } else if (isNaN(price.value)) {
        writeMsg( { id, msg: 'El precio debe ser un numero' } );
        price.classList.add('error-input');
        return true
    } else if (price.value <= 0) {
        writeMsg( { id, msg: 'El precio debe ser mayor a 0' } );
        price.classList.add('error-input');
        return true
    }
    writeMsg( { id, msg: '' } );
    price.classList.remove('error-input');
    return false
}

function stockValidator () {
    let id = 'stock_error';
    if (!stock.value) {
        writeMsg( { id, msg: 'El stock no puede estar vacío' } );
        stock.classList.add('error-input');
        return true
    } else if (isNaN(stock.value)) {
        writeMsg( { id, msg: 'El stock debe ser un numero' } );
        stock.classList.add('error-input');
        return true
    } else if (stock.value <= -1) {
        writeMsg( { id, msg: 'El stock no puede ser negativo' } );
        stock.classList.add('error-input');
        return true
    }
    writeMsg( { id, msg: '' } );
    stock.classList.remove('error-input');
    return false
}


function categoryValidator () {
    const category = document.getElementsByName("categoryId").selectedIndex;
    let id = 'stock_category';
    //const categoryErrors = document.getElementById('category_error').innerText = hasErrors.category ? 'Debe seleccionar una categoríaaaa' : '';
    if( category == null || category == 0 ) {
        // alert("Debe seleccionar una categoria");
        // return true	
        writeMsg( { id, msg: 'Debe seleccionar una categoriaaaaaaa' } );
        category.classList.add('error-input');
        return true
    }
}



// function imageValidator () {
//     let id = 'image_error';
//     let hasAnyWrongExtFile = false;
//     for (file of inputImage.files) {
//         let ext = file.name.split('.')[1];
//         console.log(ext);
//         if ( ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'gif' ) {
//             hasAnyWrongExtFile = true;
//             writeMsg( { id, msg: 'Solo se permite formato .gif, .png, .jpg y .jpeg' } );
//             inputImage.classList.add('error-input');
//             return true
//         }
//     }

//     if (inputImage.files.length != 4) {
//         writeMsg( { id, msg: 'Se deben subir 4 imágenes' } );
//         inputImage.classList.add('error-input');
//         return true
//     }

//     writeMsg( { id, msg: '' } );
//     inputImage.classList.remove('error-input');
//     return false
// }
   

// fin onload
})