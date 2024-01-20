import { signUp } from "src/services/authService";
import useAuthRedirect from "src/hooks/useAuthRedirect";
import AuthForm from "src/components/authForm";

const SignUp = () => {
  useAuthRedirect("/dashboard");

  return (
    <div className="auth-form-container">
      <AuthForm type="signUp" onSubmit={signUp} />
    </div>
  )
}

export default SignUp;
