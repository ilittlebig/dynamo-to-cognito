interface FieldLabel {
  label: string;
  type: string;
}

interface FieldLabels {
  [key: string]: FieldLabel;
}

type CTAConfig = {
  message: string | null;
  linkText: string | null;
  linkTo: string;
}

interface FormTypeConfig {
  fields: string[];
  showPasswordRequirements: boolean;
  CTA: CTAConfig;
}

interface FormConfig {
  [key: string]: FormTypeConfig;
}

export const fieldLabels: FieldLabels = {
  email: {
    label: "Email",
    type: "text"
  },
  password: {
    label: "Password",
    type: "password"
  },
  confirmPassword: {
    label: "Confirm Password",
    type: "password"
  },
  verificationCode: {
    label: "Verification Code",
    type: "text"
  },
};

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
      message: null,
      linkText: "Back to Login",
      linkTo: "/sign-in"
    }
  },
  confirmAccount: {
    fields: ["verificationCode"],
    showPasswordRequirements: false,
    CTA: {
      message: null,
      linkText: null,
      linkTo: "/sign-in"
    }
  },
};
