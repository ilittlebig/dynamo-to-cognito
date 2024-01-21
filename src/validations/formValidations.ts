import {
  FormData,
  FieldValidations,
  ValidationFunction
} from "src/types/formTypes";

export const nonEmpty: ValidationFunction = (value: string) => {
  return !value.trim() ? "This field cannot be empty" : undefined;
}

export const validateEmail: ValidationFunction = (email: string) => {
  if (!email.trim()) return "Email is required";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return "Invalid email format";
  return undefined;
}

export const validateConfirmPassword: ValidationFunction = (confirmPassword: string, formData?: FormData) => {
  if (formData?.password !== confirmPassword) return "Passwords do not match";
  return undefined;
}

export const validatePassword: ValidationFunction = (password: string) => {
  if (!password.trim()) return "Password is required";
  const conditions = {
    minLength: password.length >= 8,
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };
  return Object.values(conditions).every(condition => condition) ? undefined : "Password requirements not met";
};

export const fieldValidations: FieldValidations = {
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  verificationCode: nonEmpty,
  nonEmpty
};
