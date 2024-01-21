import { signIn } from "src/services/authService";
import { FormData } from "src/types/formTypes";
import useAuthRedirect from "src/hooks/useAuthRedirect";
import AuthForm from "src/components/authForm";

const SignIn = () => {
  useAuthRedirect("/dashboard");

  const submitForm = async (formData: FormData) => {
    await signIn(formData.email, formData.password);
  }

  return (
    <div className="auth-form-container">
      <AuthForm
        formType="signIn"
	title="Hey, Welcome Back!"
	description="Please enter your pasword"
	navigateTo="/dashboard"
	submitForm={submitForm}
      />
    </div>
  )
}

export default SignIn;
