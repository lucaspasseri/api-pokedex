import joi from "joi";

const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
    confirmPassword: joi.string().required().valid(joi.ref("password"))
});

export {signUpSchema}