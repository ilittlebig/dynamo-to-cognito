import { signUp } from "src/services/authService";
import { FormData } from "src/types/formTypes";
import useAuthRedirect from "src/hooks/useAuthRedirect";
import AuthForm from "src/components/authForm";

const SignUp = () => {
  useAuthRedirect("/dashboard");

  const submitForm = async (formData: FormData) => {
    await signUp(formData.email, formData.password);
  }

  return (
    <div className="auth-form-container">
      <AuthForm
        formType="signUp"
	title="Create An Account"
	description="Complete your registration for a 10% discount"
	navigateTo="/confirm-account"
	submitForm={submitForm}
      />
    </div>
  )
}

export default SignUp;
