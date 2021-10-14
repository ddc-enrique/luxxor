const joi = require('joi')

const validatorControllers = {
    validatorSignUp : (req, res, next) =>{
        
        const schema = !req.body.google 
        ? joi.object({
                firstName: joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                    "string.max": "Máximo de 35 caracteres",
                    "string.min": "Mínimo de 2 caracteres",
                    "string.trim": "No se permiten espacios antes y después del nombre",
                    "string.pattern.base": "No se permiten números"
                }),
                lastName: joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                    "string.max": "Máximo de 35 caracteres",
                    "string.min": "Mínimo de 2 caracteres",
                    "string.trim": "No se permiten espacios antes y después del apellido",
                    "string.pattern.base": "No se permiten números"
                }),
                eMail: joi.string().trim().min(6).max(255).email().required().messages({
                    "string.max": "Máximo de 255 caracteres",
                    "string.min": "Mínimo de 6 caracteres",
                    "string.trim": "No se permiten espacios antes y después del email",
                    "string.email": "Se debe ingresar un email valido"
                }),
                password: joi.string().trim().min(4).max(255).pattern(/^[a-zA-Z\u00C0-\u017F0-9!¡?¿\-_.]*$/).required().messages({
                    "string.max": "Máximo de 255 caracteres",
                    "string.min": "Mínimo de 4 caracteres",
                    "string.trim": "No se permiten espacios antes y después de la contraseña",
                    "string.pattern.base": 'La contraseña solo puede incluir letras, números ó los signos "!¡?¿_-."',
                }),
                profilePic: !req.body.optional ? joi.any().optional()
                : joi.string().trim().required().min(2).messages({
                    "string.empty": "El campo dirección es requerido",
                    "string.min": "Mínimo de 2 caracteres",
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
            res.json({success: false, response: validation.error.details})
        }
    },

    validatorSignIn: (req, res, next) => {
        const schema = joi.object({
            eMail: joi.string().trim().min(6).max(255).email().required().messages({
                "string.max": "Máximo de 255 caracteres",
                "string.min": "Mínimo de 6 caracteres",
                "string.email": "Se debe ingresar un email valido"
            }),
            google: joi.boolean(),
            password: joi.any().optional(),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            res.json({success: false, response: validation.error.details})
        }
    },

    validatorEditComplete: (req, res, next) => {
        const schema = joi.object({
            firstName: req.method === "POST" ? joi.any().optional()
            : joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                "string.max": "Máximo de 35 caracteres",
                "string.min": "Mínimo de 2 caracteres",
                "string.trim": "No se permiten espacios antes y después del nombre",
                "string.pattern.base": "No se permiten números"
            }),
            lastName: req.method === "POST" ? joi.any().optional()
            : joi.string().trim().min(2).max(35).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                "string.max": "Máximo de 35 caracteres",
                "string.min": "Mínimo de 2 caracteres",
                "string.trim": "No se permiten espacios antes y después del apellido",
                "string.pattern.base": "No se permiten números"
            }),
            dni: req.method === "PUT" ? joi.any().optional()
            : joi.number().integer().positive().max(99999999).min(10000000).required().messages({
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
            city: joi.string().trim().required().min(3).max(30).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).messages({
                "string.empty": "El campo ciudad es requerido",
                "string.min": "Mínimo de 3 caracteres",
                "string.max": "Máximo de 30 caracteres",
                "string.pattern.base": 'La ciudad solo puede incluir letras'
            }),
            zipCode: joi.number().integer().positive().less(10000).required().messages({
                "number.base":"El Código Postal debe ser un número",
                "number.integer": "El Código Postal debe ser un número entero",
                "number.positive": "El Código Postal debe ser un número positivo",
                "number.less": "El Código Postal debe ser un número de 4 cifras"
            }),
            address: joi.string().trim().required().min(5).max(40).pattern(/^[a-zA-Z\u00C0-\u017F0-9\/-\s]*$/).messages({
                "string.empty": "El campo dirección es requerido",
                "string.min": "Mínimo de 5 caracteres",
                "string.max": "Máximo de 40 caracteres",
                "string.pattern.base": 'La dirección puede incluir letras, números ó barra"/"'
            }),
            optional: !req.body.optional ? joi.any().optional()
            : joi.string().trim().required().min(2).max(15).pattern(/^[a-zA-Z\u00C0-\u017F0-9\/-\s]*$/).messages({
                "string.empty": "El campo dirección es requerido",
                "string.min": "Mínimo de 2 caracteres",
                "string.max": "Máximo de 15 caracteres",
                "string.pattern.base": 'La dirección puede incluir letras, números ó barra"/"'
            }),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            res.json({success: false, response: validation.error.details})
        }
    },

    validatorChangePassword: (req, res, next) => {
        const schema = joi.object({
            password: joi.string().trim().min(4).max(255).pattern(/^[a-zA-Z\u00C0-\u017F0-9!¡?¿\-_.]*$/).required().messages({
                "string.max": "Máximo de 255 caracteres",
                "string.min": "Mínimo de 4 caracteres",
                "string.trim": "No se permiten espacios antes y después de la contraseña",
                "string.pattern.base": 'La contraseña solo puede incluir letras, números ó los signos "!¡?¿_-."',
            }),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            res.json({success: false, response: validation.error.details})
        }
    },

    validatorSendNewMessage: (req, res, next) => {
        const schema = joi.object({
            authorName: joi.string().trim().min(2).max(50).pattern(/^[a-zA-Z\u00C0-\u017F\s]*$/).required().messages({
                "string.empty": "El campo nombre es requerido",
                "string.max": "Máximo de 50 caracteres",
                "string.min": "Mínimo de 5 caracteres",
                "string.trim": "No se permiten espacios antes y después del nombre",
                "string.pattern.base": "No se permiten números"
            }),
            email: joi.string().trim().min(6).max(255).email().required().messages({
                "string.empty": "El campo email es requerido",
                "string.max": "Máximo de 255 caracteres",
                "string.min": "Mínimo de 6 caracteres",
                "string.email": "Se debe ingresar un email valido"
            }),
            textMessage: joi.string().trim().min(10).max(1000).required().messages({
                "string.empty": "El campo mensaje es requerido",
                "string.max": "Es un mensaje muy largo, envialo en 2 partes si lo necesitás",
                "string.min": "Es un mensaje muy corto, contanos más",
            })
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            res.json({success: false, response: validation.error.details})
        }
    }
}

module.exports = validatorControllers