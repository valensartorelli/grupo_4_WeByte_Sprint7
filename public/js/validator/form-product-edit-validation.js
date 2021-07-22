window.addEventListener("load", function(){

// Capturar elementos

const form = document.querySelector("#product-edit");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const descriptionExt = document.querySelector("#extended_description");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");



// Eventos
form.addEventListener('submit', function (e) {
    let hasErrors = { 
        category: categoryValidator(),
        brand: brandValidator(),
        name: nameValidator(),
        description: descriptionValidator(),
        descriptionExt: descriptionExtValidator(),
        price: priceValidator(),    
        color: colorValidator(),
        size: sizeValidator(),
        stock: stockValidator(),
        visivility: visibilityValidator(),
    };
    

    if ( hasErrors.category || hasErrors.brand || hasErrors.name || hasErrors.description || hasErrors.descriptionExt || hasErrors.price 
        || hasErrors.color || hasErrors.size || hasErrors.stock || hasErrors.visivility
    ) e.preventDefault();
    

});

name.addEventListener('blur', nameValidator);
description.addEventListener('blur', descriptionValidator);
descriptionExt.addEventListener('blur', descriptionExtValidator);
price.addEventListener('blur', priceValidator);
stock.addEventListener('blur', stockValidator);


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


// selects
function categoryValidator () {
    const category = document.querySelector("#categoryId").selectedIndex;
    const errorCategory = document.querySelector("#category_error");
    if( category == null || category == 0 ) {
        // alert("Debe seleccionar una categoria");
        // return true	
        errorCategory.innerText = 'Debe seleccionar una categoríaaaa';
        return true;
    }
    else{
        errorCategory.innerText = '';
        return false;
    }
}

function brandValidator () {
    const brand = document.querySelector("#brandId").selectedIndex;
    const errorBrand = document.querySelector("#brand_error");
    if( brand  == null || brand  == 0 ) {	
        errorBrand.innerText = 'Debe seleccionar una marcaaaa';
        return true;
    }
    else{
        errorBrand.innerText = '';
        return false;
    }
}

function colorValidator () {
    const color = document.querySelector("#colorId").selectedIndex;
    const errorColor = document.querySelector("#color_error");
    if( color  == null || color  == 0 ) {
        errorColor.innerText = 'Debe seleccionar un colorrrr';
        return true;
    }
    else{
        errorColor.innerText = '';
        return false;
    }
}

function sizeValidator () {
    const size = document.querySelector("#sizeId").selectedIndex;
    const errorSize = document.querySelector("#size_error");
    if( size  == null || size  == 0 ) {	
        errorSize.innerText = 'Debe seleccionar un talleeeee';
        return true;
    }
    else{
        errorSize.innerText = '';
        return false;
    }
}

function visibilityValidator () {
    const visibility = document.querySelector("#visibilityId").selectedIndex;
    const errorVisibility = document.querySelector("#visibility_error");
    if( visibility  == null || visibility  == 0 ) {	
        errorVisibility.innerText = 'Debe seleccionar un estadoooooo';
        return true;
    }
    else{
        errorVisibility.innerText = '';
        return false;
    }
}



// fin onload
})
