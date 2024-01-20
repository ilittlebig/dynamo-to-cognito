import { signIn } from "src/services/authService";
import useAuthRedirect from "src/hooks/useAuthRedirect";
import AuthForm from "src/components/authForm";

const SignIn = () => {
  useAuthRedirect("/dashboard");

  return (
    <div className="auth-form-container">
      <AuthForm type="signIn" onSubmit={signIn} />
    </div>
  )
}

export default SignIn;
