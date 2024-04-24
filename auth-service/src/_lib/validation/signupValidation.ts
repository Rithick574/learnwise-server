import Joi from "joi"

export const signupValidation = Joi.object({
username: Joi
    .string()
    .min(4)
    .required(),

firstName: Joi
    .string()
    .required(),

lastName: Joi
    .string()
    .required(),

email: Joi
    .string()
    .email()
    .required(),

password: Joi
    .string()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
    .required(),
})