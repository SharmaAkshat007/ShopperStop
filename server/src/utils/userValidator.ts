import joi from "joi";

const passwordPattern =
  "^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,}).{10,20}$";

const roleTypes = ["buyer", "seller"];

export const signUpValidation = (data: any): joi.ValidationResult<any> => {
  const signUpValidationSchema = joi.object({
    first_name: joi.string().max(50).required(),
    last_name: joi.string().max(50).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(RegExp(passwordPattern))
      .min(8)
      .max(20)
      .required(),
  });
  return signUpValidationSchema.validate(data, { convert: false });
};

export const loginValidation = (data: any): joi.ValidationResult<any> => {
  const loginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().valid(...roleTypes),
  });
  return loginValidationSchema.validate(data, { convert: false });
};
