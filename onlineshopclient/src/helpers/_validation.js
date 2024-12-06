/* eslint-disable prefer-regex-literals */
import Joi from 'joi';
// import PassowordComplexity from 'joi-password-complexity';

const schemas = {
  signup: Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(20)
        .message('First name should be between 3 - 20 character long'),
    lastName: Joi.string()
        .min(3)
        .max(20)
        .message('Last name should be between 3 - 20 character long'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message('Please enter a valid email address'),
    password: Joi.string()
        .min(8)
        .max(25)
        .message('Should be strong password with more that eight characters and less than 25'),
  }),
  product: Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .message('Name should be between 3 - 20 character long'),
    description: Joi.string()
        .min(3)
        .max(1000)
        .message('Last name should be between 3 - 1000 character long'),
    price: Joi.string()
        .alphanum()
        .message('Price is required and should be a number'),
    image: Joi.string()
        .min(1)
        .message('Image is required'),
  }),
};

export default (schema, object) => schemas[schema].validate(object);
