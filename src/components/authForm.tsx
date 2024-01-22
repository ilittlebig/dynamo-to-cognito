import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "src/contexts/formContext";
import { AuthFormProps, FormData } from "src/types/formTypes";
import { fieldLabels, formConfig } from "src/configs/formConfig";

import InputField from "src/components/inputField";
import PasswordRequirements from "src/components/passwordRequirements";
import Button from "src/components/button";

const AuthForm = ({
  formType,
  title,
  description,
  submitForm,
  navigateTo
}: AuthFormProps) => {
  const navigate = useNavigate();
  const form = formConfig[formType];
  const { message, linkText, linkTo, linkClick } = form.CTA;

  // Errors from AWS Cognito API
  const [generalError, setGeneralError] = useState("");

  const {
    validateField,
    loading,
    setLoading,
    formData,
    setFormData,
    errors,
    formValid,
    setFormValid
  } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const field = id as keyof FormData;

    const updatedFormData = { ...formData, [field]: value }
    setFormData(updatedFormData);
    validateField(field, value, updatedFormData);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await submitForm(formData);
      navigate(navigateTo);

      // Reset state when navigating to new page
      setFormValid(false);
    } catch (error: any) {
      setGeneralError(error.message);
    } finally {
      setLoading(false);
    }
  }

  /* Handles the CTA under the button */
  const handleCTALink = () => {
    if (!linkClick) return;
    linkClick(formData);
  }

  return (
    <form className="auth-form">
      <div className="auth-form auth-form__heading">
	<h1>{title}</h1>
	<p>{description}</p>
      </div>

      <div className="auth-form auth-form__forms">
        {form.fields.map((fieldId, index) => {
	  const fieldLabel = fieldLabels[fieldId];
	  return (
	    <InputField
	      id={fieldId}
	      label={fieldLabel.label}
	      type={fieldLabel.type}
	      value={formData[fieldId]}
	      error={errors[fieldId]}
	      onChange={handleChange}
	    />
	  )
	})}
      </div>

      {form.showPasswordRequirements && (
	<PasswordRequirements password={formData.password} />
      )}

      {/* Error messages from AWS Cognito */}
      {generalError &&
        <p className="auth-form__error auth-form__error--api">
	  {generalError}
	</p>
      }

      <Button
	label="Continue"
	onClick={handleSubmit}
	loading={loading}
	disabled={loading || !formValid}
      />

      <p className="auth-form__CTA">
	{message && message}
	<span role="button" onClick={handleCTALink}>
	  <a className="auth-form__CTA__Button" href={linkTo}>
	    {linkText}
	  </a>
	</span>
      </p>
    </form>
  )
}

export default AuthForm;
