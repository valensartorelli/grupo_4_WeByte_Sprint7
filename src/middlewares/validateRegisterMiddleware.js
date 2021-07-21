const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('firstName').notEmpty().withMessage('Tienes que escribir tu nombre').bail()
		.isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
	body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido').bail()
		.isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
	body('userName').notEmpty().withMessage('Tienes que escribir un usuario').bail()
		.isLength({ min: 2 }).withMessage('El usuario debe tener al menos 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,}$/).withMessage('Tu contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial').bail()
		.isLength({ min: 8, max: 11 }).withMessage('La contraseña debe tener entre 8 y 11 caracteres'),
	body('repassword').notEmpty().withMessage('Tienes que volver a escribir la contraseña').bail()
		.custom((value, { req }) => {
			if(value != req.body.password){
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
		}),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', 'JPEG', '.PNG', '.GIF'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	}),
	body('rolId').notEmpty().withMessage('Tienes que elegir un tipo de usuario')
]