import { ReactNode, ChangeEvent } from "react";

export interface FormErrors {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface FormData {
  [key: string]: string;
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

export interface FormContextType {
  validateField: (fieldId: keyof FormData, value: string, formData: FormData) => void;
  errors: FormErrors;
  formValid: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setFormValid: (formValid: boolean) => void;
  formData: FormData;
  setFormData: (formData: FormData) => void;
}

export interface FormProviderProps {
  children: ReactNode;
  formType: string;
}

export interface AuthFormProps {
  formType: string;
  title: string;
  description: string;
  submitForm: (formData: FormData) => void;
  navigateTo: string;
}

export interface FormValidationProps {
  errors: FormErrors,
  setErrors: (errors: FormErrors) => void;
  setFormValid: (formValid: boolean) => void;
  formData: FormData;
}

export interface FormStateProps {
  validateField: (fieldId: keyof FormData, value: string, formData: FormData) => void;
  isFormValid: (formData: FormData) => boolean;
  setLoading: (loading: boolean) => void;
  formData: FormData;
  setFormData: (formData: FormData) => void;
}

export type ValidationFunction = (value: string, formData?: FormData) => string | undefined;

export interface FieldValidations {
  [key: string]: ValidationFunction;
}

export interface ValidationRules {
  [key: string]: FieldValidations;
}

interface FieldLabel {
  label: string;
  type: string;
}

export interface FieldLabels {
  [key: string]: FieldLabel;
}

type CTAConfig = {
  message?: string;
  linkText?: string;
  linkTo?: string;
  linkClick?: (formData: FormData) => any;
}

interface FormTypeConfig {
  fields: string[];
  showPasswordRequirements: boolean;
  CTA: CTAConfig;
}

export interface FormConfig {
  [key: string]: FormTypeConfig;
}
