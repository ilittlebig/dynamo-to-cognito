import { confirmRegistration } from "src/services/authService";
import { FormData } from "src/types/formTypes";
import useAuthRedirect from "src/hooks/useAuthRedirect";
import AuthForm from "src/components/authForm";

const ConfirmAccount = () => {
  useAuthRedirect("/dashboard");

  const submitForm = async (formData: FormData) => {
    await confirmRegistration(formData.email, formData.verificationCode);
  }

  return (
    <div className="auth-form-container">
      <AuthForm
        formType="confirmAccount"
	title="Confirm your Account"
	description="We have sent a code to your email. Enter it below to confirm your account."
	navigateTo="/confirmed-account"
	submitForm={submitForm}
      />
    </div>
  )
}

export default ConfirmAccount;
