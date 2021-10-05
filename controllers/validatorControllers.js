const joi = require('joi')

const validatorControllers = {
    validatorSignUp : (req, res, next) =>{
        const schema = !req.body.google 
        ? joi.object({
                firstName: joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                    "string.max": "Se permite un máximo de 35 caracteres",
                    "string.min": "Se requiere un mínimo de 2 caracteres",
                    "string.trim": "No se permiten espacios antes y después del nombre",
                    "string.pattern.base": "No se permiten números"
                }),
                lastName: joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                    "string.max": "Se permite un máximo de 35 caracteres",
                    "string.min": "Se requiere un mínimo de 2 caracteres",
                    "string.trim": "No se permiten espacios antes y después del apellido",
                    "string.pattern.base": "No se permiten números"
                }),
                eMail: joi.string().trim().min(6).max(255).email().required().messages({
                    "string.max": "Se permite un máximo de 255 caracteres",
                    "string.min": "Se requiere un mínimo de 6 caracteres",
                    "string.trim": "No se permiten espacios antes y después del email",
                    "string.email": "Se debe ingresar un email valido"
                }),
                password: joi.string().trim().min(4).max(255).pattern(/^[a-zA-Z\u00C0-\u017F0-9!¡?¿\-_.]*$/).required().messages({
                    "string.max": "Se permite un máximo de 255 caracteres",
                    "string.min": "Se requiere un mínimo de 4 caracteres",
                    "string.trim": "No se permiten espacios antes y después de la contraseña",
                    "string.pattern.base": 'La contraseña solo puede incluir letras, números ó los signos "!¡?¿_-."',
                }),
                profilePic: joi.string().trim().min(6).max(2048).required().messages({
                    "string.max": "Se permite un máximo de 2048 caracteres",
                    "string.min": "Se requiere un mínimo de 6 caracteres",
                    "string.trim": "No se permiten espacios antes y después de la imagen"
                }),
            })
        : joi.object({
            firstName: joi.string(),
            lastName: joi.string(),
            eMail: joi.string(),
            password: joi.string(),
            profilePic: joi.string(),
            google: joi.boolean(),
        });
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            res.json({success: false, errors: validation.error.details})
        }
    },
    validatorCompleteProfile: (req, res, next) =>{
        const schema = joi.object({
            firstName: joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                "string.max": "Se permite un máximo de 35 caracteres",
                "string.min": "Se requiere un mínimo de 2 caracteres",
                "string.trim": "No se permiten espacios antes y después del nombre",
                "string.pattern.base": "No se permiten números"
            }),
            lastName: joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                "string.max": "Se permite un máximo de 35 caracteres",
                "string.min": "Se requiere un mínimo de 2 caracteres",
                "string.trim": "No se permiten espacios antes y después del apellido",
                "string.pattern.base": "No se permiten números"
            }),
            dni: joi.number().integer().positive().max(99999999).min(10000000).required().messages({
                "number.base":"El DNI debe ser un número",
                "number.integer": "El DNI debe ser un número entero",
                "number.positive": "El DNI debe ser un número positivo",
                "number.max": "El DNI debe ser un número de 8 cifras",
                "number.min": "El DNI debe ser un número de 8 cifras",
            }),
            phone: joi.string().trim().min(4).max(16).pattern(/^[0-9+-\s]*$/).messages({
                "string.min": "Por favor ingrese un número de teléfono válido",
                "string.max": "Máximo de 15 números",
                "string.pattern.base": 'El télefono puede incluir números, signo "+" ó guión "-"'
            }),
            zipCode: joi.number().integer().positive().less(10000).required().messages({
                "number.base":"El Código Postal debe ser un número",
                "number.integer": "El Código Postal debe ser un número entero",
                "number.positive": "El Código Postal debe ser un número positivo",
                "number.less": "El Código Postal debe ser un número de 4 cifras"
            }),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            res.json({success: false, errors: validation.error.details})
        }
    },

}

module.exports = validatorControllers