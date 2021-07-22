const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('categoryId').notEmpty().withMessage('Tienes que elegir una categoria'),
	body('brandId').notEmpty().withMessage('Tienes que elegir una marca'),
	body('name').notEmpty().withMessage('Tienes que escribir un nombre').bail().isLength({ min: 5 }).withMessage('Tienes que escribir al menos 5 caracteres'),
	body('description').notEmpty().withMessage('Tienes que escribir una descripcion').bail().isLength({ min: 20 }).withMessage('Tienes que escribir al menos 20 caracteres'),
	body('extended_description').notEmpty().withMessage('Tienes que escribir una descripcion ampliada').bail().isLength({ min: 20 }).withMessage('Tienes que escribir al menos 20 caracteres'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio'),
    body('colorId').notEmpty().withMessage('Tienes que elegir un color'),
	body('sizeId').notEmpty().withMessage('Tienes que elegir un talle'),
	body('stock').notEmpty().withMessage('Tienes que escribir una cantidad'),
	body('image1').custom((value, {req}) =>{
        let file  = req.files.image1;
        let file2 = req.files.image2;
        let file3 = req.files.image3;
		let file4 = req.files.image4;
        let file5 = req.files.image5;
        let oldImage1 = req.body.oldImage1;
        let oldImage2 = req.body.oldImage2;
        let oldImage3 = req.body.oldImage3;
        let oldImage4 = req.body.oldImage4;
        let oldImage5 = req.body.oldImage4;
        console.log("image1");
        console.log(file);
     
        console.log("--------Validacion img1-----------");
        let acceptedExtensions = ['.JPG', '.JPEG', '.jpg', '.png', '.gif', '.jpeg', '.PNG', '.GIF'];
        
        if (!file && !file2 && !file3 && !file4 && !file5 && oldImage1 == "" && oldImage2 == "" && oldImage3 == "" && oldImage4 == "" && oldImage5 == ""){
			throw new Error('Tienes que subir una imagen');
        } else{
                let fileExtension = path.extname(file [0].originalname);
                console.log("Extension");
                console.log(fileExtension);
                console.log("-------------------");
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                } 
        }
        return true;
    }),
	body('image2').custom((value, {req}) =>{
        let file = req.files.image2;
        let oldImage2 = req.body.oldImage2;
        let acceptedExtensions = ['.JPG', '.JPEG', '.jpg', '.png', '.gif', '.jpeg', '.PNG', '.GIF'];
        //console.log(file.originalname);
        if(file){
            let fileExtension = path.extname(file [0].originalname);
           if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    }),
	body('image3').custom((value, {req}) =>{
        let file = req.files.image3;
        let oldImage3 = req.body.oldImage3;
        let acceptedExtensions = ['.JPG', '.JPEG', '.jpg', '.png', '.gif', '.jpeg', '.PNG', '.GIF'];
        //console.log(file.originalname);
        if(file){
            let fileExtension = path.extname(file [0].originalname);
           if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    }),
	body('image4').custom((value, {req}) =>{
        let file = req.files.image4;
        let oldImage4 = req.body.oldImage4;
        let acceptedExtensions = ['.JPG', '.JPEG', '.jpg', '.png', '.gif', '.jpeg', '.PNG', '.GIF'];
        //console.log(file.originalname);
        if(file){
            let fileExtension = path.extname(file [0].originalname);
           if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    }),
	body('image5').custom((value, {req}) =>{
        let file = req.files.image5;
        let oldImage5 = req.body.oldImage5;
        let acceptedExtensions = ['.JPG', '.JPEG', '.jpg', '.png', '.gif', '.jpeg', '.PNG', '.GIF'];
        //console.log(file.originalname);
        if(file){
            let fileExtension = path.extname(file [0].originalname);
           if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    }),
	body('visibilityId').notEmpty().withMessage('Tienes que elegir un estado')
]