import { FormData, FormConfig, FieldLabels } from "src/types/formTypes";
import { resendConfirmationCode } from "src/services/authService";

export const formInitialState: FormData = {
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: ""
};

export const fieldLabels: FieldLabels = {
  email: { label: "Email", type: "email" },
  password: { label: "Password", type: "password" },
  confirmPassword: { label: "Confirm Password", type: "password" },
  verificationCode: { label: "Verification Code", type: "text" },
};

/* Determines what fields to show on each form page */

export const formConfig: FormConfig = {
  signIn: {
    fields: ["email", "password"],
    showPasswordRequirements: false,
    CTA: {
      message: "Don't have an account?",
      linkText: "Sign Up",
      linkTo: "/sign-up"
    }
  },
  signUp: {
    fields: ["email", "password", "confirmPassword"],
    showPasswordRequirements: true,
    CTA: {
      linkText: "Back to Login",
      linkTo: "/sign-in"
    }
  },
  confirmAccount: {
    fields: ["verificationCode"],
    showPasswordRequirements: false,
    CTA: {
      message: "Didn't recieve a code?",
      linkText: "Send a new code",
      linkClick: resendConfirmationCode
    }
  },
};
