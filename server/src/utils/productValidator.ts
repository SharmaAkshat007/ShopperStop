import joi from "joi";

const productValidation = (data: any) => {
  const productValidationSchema = joi.object({
    name: joi.string().max(100).required(),
    description: joi.string().required(),
    quantity: joi.number().positive().precision(0).required(),
    price: joi.number().positive().precision(2).required(),
  });

  return productValidationSchema.validate(data, { convert: false });
};

export { productValidation };
