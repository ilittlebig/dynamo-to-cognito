import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "src/contexts/formContext";
import { AuthFormProps } from "src/types/formTypes";
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
  // Errors from AWS Cognito API
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const form = formConfig[formType];
  const cta = form.CTA;
  const ctaMessage = cta.message;
  const ctaLinkText = cta.linkText;
  const ctaLinkTo = cta.linkTo;

  const {
    handleChange,
    loading,
    setLoading,
    formData,
    errors,
    formValid
  } = useFormContext();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await submitForm(formData);
      navigate(navigateTo);
    } catch (error: any) {
      setGeneralError(error.message);
    } finally {
      setLoading(false);
    }
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
	{ctaMessage && ctaMessage} <a className="auth-form__CTA__Button" href={ctaLinkTo}>{ctaLinkText}</a>
      </p>
    </form>
  )
}

export default AuthForm;
