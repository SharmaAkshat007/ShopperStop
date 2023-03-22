import errors from "./error";

export function checkEmailError(error: string): boolean {
  return error === errors.emptyEmail || error === errors.invalidEmail;
}

export function checkPasswordError(error: string): boolean {
  return error === errors.emptyPassword || error === errors.invalidPassword;
}

export function isValidEmail(value: string): boolean {
  const emailPattern: RegExp = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$"
  );
  return emailPattern.test(value);
}

export function isValidPassword(value: string): boolean {
  const passwordPattern: RegExp = new RegExp(
    "^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,}).{10,20}$"
  );
  return passwordPattern.test(value);
}

export function emailHelper(
  event: any,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
) {
  const value: string = event.target.value;
  setEmail(value);
  if (value.length === 0) {
    setError(errors.emptyEmail);
  } else if (!isValidEmail(value)) {
    setError(errors.invalidEmail);
  } else {
    setError(errors.noError);
  }
}
