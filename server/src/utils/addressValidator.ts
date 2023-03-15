import joi from "joi";

const addressValidation = (data: any) => {
  const addressValidationSchema = joi.object({
    address_line1: joi.string().required(),
    address_line2: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    pin_code: joi.string().required(),
    mobile_no: joi.string().required(),
  });

  return addressValidationSchema.validate(data, { convert: false });
};

export default addressValidation;
