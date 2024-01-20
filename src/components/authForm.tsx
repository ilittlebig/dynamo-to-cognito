import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useFormValidation, { FormData } from "src/hooks/useFormValidation";

import InputField from "src/components/inputField";
import PasswordRequirements from "src/components/passwordRequirements";
import Button from "src/components/button";

interface AuthFormProps {
  type: string;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Error message from AWS Cognito
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isSignUp = type === "signUp";

  const {
    validateField,
    validateForm,
    errors,
    isFormValid
  } = useFormValidation(isSignUp);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const field = id as keyof FormData;

    const updatedFormData = { ...formData, [field]: value }
    setFormData(updatedFormData);
    validateField(field, value, updatedFormData);
  }

  const onClick = async () => {
    // Should not be needed, but in case of failure
    const isFormValid = validateForm(formData);
    if (!isFormValid) return;

    try {
      setLoading(true);
      await onSubmit(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSignUp) {
      setIsValid(isFormValid(formData));
    } else {
      const isEmailValid = formData.email.trim() !== "";
      const isPasswordValid = formData.password.trim() !== "";
      setIsValid(isEmailValid && isPasswordValid);
    }
  }, [errors]);

  return (
    <form className="auth-form">
      <div className="auth-form auth-form__heading">
        {isSignUp ? (
	  <>
	    <h1>Create An Account</h1>
	    <p>Complete your registration for a 10% discount.</p>
	  </>
	) : (
	  <>
	    <h1>Hey, Welcome Back!</h1>
	    <p>Please enter your password</p>
	  </>
	)}
      </div>

      <div className="auth-form auth-form__forms">
	<InputField
	  id="email"
	  label="Email Address"
	  type="text"
	  value={formData.email}
	  error={isSignUp ? errors.email : undefined}
	  onChange={handleChange}
	/>

	<InputField
	  id="password"
	  label="Password"
	  type="password"
	  value={formData.password}
	  error={isSignUp ? errors.password : undefined}
	  onChange={handleChange}
	/>

	{isSignUp && (
	  <InputField
	    id="confirmPassword"
	    label="Confirm Password"
	    type="password"
	    value={formData.confirmPassword}
	    error={errors.confirmPassword}
	    onChange={handleChange}
	  />
	)}
      </div>

      {isSignUp && (
	<PasswordRequirements password={formData.password} />
      )}

      {/* Error messages from AWS Cognito */}
      {error &&
        <p className="auth-form__error auth-form__error--api">
	  {error}
	</p>
      }

      <div className="auth-form auth-form__button-container">
	<Button
	  label="Continue"
	  onClick={onClick}
	  loading={loading}
	  disabled={loading || !isValid}
	/>
      </div>

      {isSignUp ? (
	<a href="/sign-in" className="auth-form__CTA__Button">
	  Back to Login
	</a>
      ) : (
	<p className="auth-form__CTA">
	  Don't have an account? <a className="auth-form__CTA__Button" href="/sign-up">Click Here</a>
	</p>
      )}
    </form>
  )
}

export default AuthForm;
