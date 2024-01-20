import { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  other?: string;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const useFormValidation = (isSignUp: boolean) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const isFormValid = (formData: FormData) => {
    for (const key of Object.keys(formData) as Array<keyof FormData>) {
      if (!formData[key].trim()) return false;
    }
    return !Object.values(errors).some(error => error);
  }

  const validatePassword = (password: string) => {
    const conditions = {
      minLength: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password)
    };
    return Object.values(conditions).every(condition => condition);
  }

  const validateField = (fieldId: keyof FormData, value: string, formData: FormData) => {
    let tempErrors: FormErrors = { ...errors };

    const emptyField = !value.trim();
    tempErrors[fieldId] = emptyField ?
      `${fieldId[0].toUpperCase() + fieldId.slice(1)} is required` : undefined;

    const isFieldPassword =
      fieldId === "password" ||
      fieldId === "confirmPassword";

    if (isSignUp && isFieldPassword) {
      const isValidPassword = validatePassword(formData.password);
      tempErrors.password = !isValidPassword ?
	"Password does not meet requirements" : undefined;

      tempErrors.confirmPassword =
	formData.password !== formData.confirmPassword ?
	"Passwords do not match" : undefined
    }

    if (isSignUp && fieldId === "email") {
      const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
      tempErrors.email = !isValidEmail ?
	"Invalid email format" : undefined;
    }
    setErrors(tempErrors);
  }

  const validateForm = (formData: FormData) => {
    let tempErrors: FormErrors = { ...errors };
    Object.keys(formData).forEach((key) => {
      validateField(key as keyof FormData, formData[key as keyof FormData], formData);
    });

    setErrors(tempErrors);
    return !Object.values(tempErrors).some(error => error);
  }

  return { validateField, validateForm, errors, isFormValid };
}

export default useFormValidation;
