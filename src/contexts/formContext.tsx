import { useState, createContext, useContext } from "react";
import {
  FormErrors,
  FormContextType,
  FormProviderProps 
} from "src/types/formTypes";
import { formInitialState } from "src/configs/formConfig";
import useFormValidation from "src/hooks/useFormValidation";

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children, formType }: FormProviderProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(formInitialState);

  /* Dependencies are explicitly passed to ensure modularity and reduce
     tight coupling between state management and validation logic */
  const { validateField } = useFormValidation(formType, {
    errors,
    setErrors,
    setFormValid,
    formData
  });

  return (
    <FormContext.Provider value={{
      validateField,
      loading,
      setLoading,
      formData,
      setFormData,
      errors,
      formValid,
      setFormValid
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
