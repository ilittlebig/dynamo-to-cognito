import { useState, ChangeEvent } from "react";
import { FormData, FormStateProps } from "src/types/formTypes";

const useFormState = ({ validateField, isFormValid, setLoading, formData, setFormData }: FormStateProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const field = id as keyof FormData;

    const updatedFormData = { ...formData, [field]: value }
    setFormData(updatedFormData);
    validateField(field, value, updatedFormData);
  }

  return { handleChange }
}

export default useFormState;
