const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre').bail().isLength({ min: 5 }).withMessage('Tienes que escribir al menos 5 caracteres'),
	body('description').notEmpty().withMessage('Tienes que escribir una descripcion').bail().isLength({ min: 20 }).withMessage('Tienes que escribir al menos 20 caracteres'),
	body('extended_description').notEmpty().withMessage('Tienes que escribir una descripcion Ampliada').bail().isLength({ min: 20 }).withMessage('Tienes que escribir al menos 20 caracteres'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio').bail()
                 .custom(price => price >= 0).withMessage('El precio debe ser un valor positivo').bail()
                 .custom(price => price > 0).withMessage('El precio no puede ser 0'),
    body('stock').notEmpty().withMessage('Tienes que escribir un stock').bail()
                 .custom(price => price >= 0).withMessage('El precio debe ser un valor positivo')
   

	
]