import {
  CognitoUserPool,
  CognitoUserSession,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const USER_POOL = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_CLIENT_ID!
});

/* Returns the current authorized user */

export const getCurrentUser = () => {
  return USER_POOL.getCurrentUser();
}

export const isAuthenticated = () => {
  const user = getCurrentUser();
  if (!user) return null;

  return new Promise((resolve, reject) => {
    user.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) return reject(err);
      resolve(session.isValid());
    });
  });
}

/* Invalidates the identity, access, and refresh tokens
   that Amazon Cognito issued to a user */

export const signOut = async () => {
  const user = getCurrentUser();
  if (!user) return null;

  return new Promise<void>((resolve, reject) => {
    user.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err || !session.isValid()) {
	return reject("User is not authenticated or session is invalid.");
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
	return reject(err);
      }
      resolve(result.user);
    })
  });
}
