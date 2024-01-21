import { useState, createContext, useContext } from "react";
import {
  FormErrors,
  FormContextType,
  FormProviderProps 
} from "src/types/formTypes";
import useFormValidation from "src/hooks/useFormValidation";
import useFormState from "src/hooks/useFormState";

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children, formType }: FormProviderProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: ""
  });

  /* Dependencies are explicitly passed to ensure modularity and reduce
     tight coupling between state management and validation logic */
  const {
    validateField,
    isFormValid
  } = useFormValidation(formType, { errors, setErrors, setFormValid, formData });
  const { handleChange } = useFormState({ validateField, isFormValid, setLoading, formData, setFormData });

  return (
    <FormContext.Provider value={{
      handleChange,
      loading,
      setLoading,
      formData,
      errors,
      formValid
    }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
