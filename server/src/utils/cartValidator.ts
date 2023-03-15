import joi from "joi";

export const cartValidation = (data: any) => {
  const cartValidatorSchema = joi.object({
    product_id: joi.string().required(),
    quantity: joi.number().required(),
  });

  return cartValidatorSchema.validate(data, { convert: false });
};
