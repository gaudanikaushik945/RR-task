const Joi = require("joi");

// Middleware for user registration validation
const userRegisterSchema = () => {
  return (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "Name is required.",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
      }),
      phone_number: Joi.number().integer().required().messages({
        "number.base": "Phone number must be a valid number.",
      }),
      select_business_category: Joi.string().required().messages({
        "string.base": "Business category must be a string.",
      }),
      date_of_birth: Joi.date().required().messages({
        "date.base": "Date of birth must be a valid date.",
        "any.required": "Date of birth is required.",
      }),
      password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long.",
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation errors",
        errors: error.details.map((e) => e.message),
      });
    }
    next();
  };
};

// Middleware for user login validation
const userLoginSchema = () => {
  return (req, res, next) => {
    const schema = Joi.object({
      phone_number: Joi.number().integer().required().messages({
        "number.base": "Phone number must be a valid number.",
      }),
      password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long.",
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation errors",
        errors: error.details.map((e) => e.message),
      });
    }
    next();
  };
};

module.exports = {
  userRegisterSchema,
  userLoginSchema,
};
