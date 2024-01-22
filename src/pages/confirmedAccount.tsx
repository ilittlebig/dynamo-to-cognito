import useAuthRedirect from "src/hooks/useAuthRedirect";

const ConfirmedAccount = () => {
  useAuthRedirect("/dashboard");

  return (
    <div className="auth-form-container">
      <div className="auth-form auth-form__heading">
	<h1>Verification Successful</h1>
	<p>
	  Your account verification is successful. You can now go ahead and <a className="text-green" href="/sign-in">sign in</a>.
	</p>
      </div>
    </div>
  )
}

export default ConfirmedAccount;
