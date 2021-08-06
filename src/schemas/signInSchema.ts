import joi from "joi"

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});

export { signInSchema }