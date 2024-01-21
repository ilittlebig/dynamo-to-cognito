import { useEffect } from "react";
import {
  FormErrors,
  FormData,
  FormValidationProps,
  ValidationRules 
} from "src/types/formTypes";
import { fieldValidations } from "src/validations/formValidations";

const useFormValidation = (formType: string, {
  errors,
  setErrors,
  setFormValid,
  formData
}: FormValidationProps) => {
  const validationRules: ValidationRules = {
    signIn: {
      email: fieldValidations.nonEmpty,
      password: fieldValidations.nonEmpty
    },
    signUp: {
      email: fieldValidations.email,
      password: fieldValidations.password,
      confirmPassword: fieldValidations.confirmPassword,
    },
    confirmAccount: {
      verificationCode: fieldValidations.verificationCode,
    },
  };

  /* Returns a boolean if the entire form is valid */

  const isFormValid = (formData: FormData) => {
    const rules = validationRules[formType];
    if (!rules) {
      throw new Error(`No validation rules defined for form type: ${formType}`);
    }

    for (const [field, validationFunction] of Object.entries(rules)) {
      const value = formData[field];
      const errorMessage = validationFunction(value, formData);
      if (errorMessage) return false;
    }
    return true;
  }

  /* Validates a single field */

  const validateField = (fieldId: keyof FormData, value: string, formData: FormData) => {
    const tempErrors: FormErrors = { ...errors };
    const formRules = validationRules[formType];
    if (!formRules) return;

    const validationFunction = formRules[fieldId];
    if (validationFunction) {
      tempErrors[fieldId] = validationFunction(value, formData)
    }

    if (fieldId === "password" || fieldId === "confirmPassword") {
      const confirmPasswordValidation = formRules.confirmPassword;
      if (confirmPasswordValidation) {
	tempErrors.confirmPassword = confirmPasswordValidation(formData.confirmPassword, formData);
      }
    }
    setErrors(tempErrors);
  }

  /* Validates all fields at the same time */

  const validateForm = (formData: FormData) => {
    let tempErrors: FormErrors = { ...errors };
    Object.keys(formData).forEach((key) => {
      validateField(key as keyof FormData, formData[key as keyof FormData], formData);
    });
    setErrors(tempErrors);
  }

  useEffect(() => {
    const isValid = isFormValid(formData);
    setFormValid(isValid);
  }, [formData]);

  return { validateField, validateForm, isFormValid, errors };
}

export default useFormValidation;
