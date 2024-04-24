import Joi from "joi";

export const loginValidation = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required(),
})