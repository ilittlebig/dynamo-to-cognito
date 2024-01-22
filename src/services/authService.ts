import {
  CognitoUserPool,
  CognitoUserSession,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { FormData } from "src/types/formTypes";

const USER_POOL = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_CLIENT_ID!
});

/* Returns the current authorized user */

export const getCurrentUser = () => {
  return USER_POOL.getCurrentUser();
}

/* Returns a boolean if the user is logged in */

export const isAuthenticated = () => {
  const user = getCurrentUser();
  if (!user) return null;

  return new Promise((resolve, reject) => {
    user.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
	reject(err);
	return;
      }
      resolve(session.isValid());
    });
  });
}

/* Sends a verification code to verify user after
   registration */

export const resendConfirmationCode = ({ email }: FormData) => {
  const emptyEmail = !email.trim();
  if (emptyEmail) return;

  const userData = {
    Username: email,
    Pool: USER_POOL
  };

  const cognitoUser = new CognitoUser(userData);
  cognitoUser.resendConfirmationCode(() => {});
}

/* Confirms user registration by validating the provided
   verification code */

export const confirmRegistration = async (email: string, verificationCode: string) => {
  const userData = {
    Username: email,
    Pool: USER_POOL
  };

  const cognitoUser = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
	reject(err);
	return;
      }
      resolve(result);
    });
  })
}

/* Invalidates the identity, access, and refresh tokens
   that Amazon Cognito issued to a user */

export const signOut = async () => {
  const user = getCurrentUser();
  if (!user) return null;

  return new Promise<void>((resolve, reject) => {
    user.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err || !session.isValid()) {
	reject("User is not authenticated or session is invalid.");
	return;
      }

      user.globalSignOut({
	onSuccess: () => resolve(),
	onFailure: (err) => reject(err)
      });
    });
  });
}

export const signIn = async (email: string, password: string) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  const userData = {
    Username: email,
    Pool: USER_POOL
  };

  const cognitoUser = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.setAuthenticationFlowType("USER_PASSWORD_AUTH");
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
	resolve(session);
      },

      onFailure: (err) => {
	reject(err);
      }
    });
  });
}

export const signUp = async (email: string, password: string) => {
  const emailAttribute = {
    Name: "email",
    Value: email
  };

  const attributeList = [
    new CognitoUserAttribute(emailAttribute)
  ];

  return new Promise((resolve, reject) => {
    USER_POOL.signUp(email, password, attributeList, [], (err, result) => {
      if (err || !result) {
	reject(err);
	return;
      }
      resolve(result.user);
    })
  });
}
