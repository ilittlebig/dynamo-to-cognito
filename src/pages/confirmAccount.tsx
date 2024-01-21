import { signIn } from "src/services/authService";
import { FormData } from "src/types/formTypes";
import useAuthRedirect from "src/hooks/useAuthRedirect";
import AuthForm from "src/components/authForm";

const ConfirmAccount = () => {
  useAuthRedirect("/dashboard");

  const submitForm = async (formData: FormData) => {
    await signIn(formData.email, formData.password);
  }

  return (
    <div className="auth-form-container">
      <AuthForm
        formType="confirmAccount"
	title="Confirm your Account"
	description="Please enter the code sent to blah blah email."
	navigateTo="/dashboard"
	submitForm={submitForm}
      />
    </div>
  )
}

export default ConfirmAccount;
