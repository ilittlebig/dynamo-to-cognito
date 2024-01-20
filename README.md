# Dynamo-To-Cognito
This project was developed to provide practical experience with Amazon Web Services, particularly with AWS Cognito and AWS DynamoDB. AWS Cognito offers streamlined solutions for user sign-up and authentication processes, while AWS DynamoDB serves as a powerful NoSQL database service. The core functionality of the website enables users to seamlessly migrate their accounts from DynamoDB to AWS Cognito, showcasing the integration of these two services.

The project was designed with a focus on using industry-standard practices for naming and coding styles. This approach has made the code clean, straightforward, and easy to understand, much like what you would expect in a professional setting.

## Lambda Function
AWS Cognito uses AWS Lambda, which is a serverless compute service for running code without having to manage servers. Every time someone attempts to log in, the system first checks if the user is in the user pool. If the user is not found, it triggers the `UserMigration_Authentication` trigger to search for the user in the old database, and if the user is located, it then compares the plain text password entered by the user with the saved hashed password. After authenticating the user, it returns a successful event, and a user is created in the user pool with an encrypted password. 

This comparison is done using `bcrypt`, as the original password was encrypted with `bcrypt`. This process ensures secure and accurate user migration without requiring the users to take action. The source code for this Lambda function is not included in the project's files since it is directly uploaded and managed on AWS Lambda. Instead, you can see it here:
```ts
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import bcrypt from "bcryptjs";

const DB_CLIENT = new DynamoDBClient({
  region: "us-east-2",
});

/* Checks if the user details are present in the old database
   Returns the user */

const authenticateUser = async (email, password) => {
  const params = {
    TableName: "Users",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email }
    }
  };

  try {
    const command = new QueryCommand(params);
    const result = await DB_CLIENT.send(command);

    const validResult = result?.Items && result.Items.length > 0;
    if (!validResult) return null;

    const user = result.Items[0];
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.passwordHash.S);
    if (!passwordMatches) return null;
    return user;
  } catch (error) {
    throw error;
  }
}

export const handler = async (event) => {
  if (event.triggerSource === "UserMigration_Authentication") {
    const user = await authenticateUser(event.userName, event.request.password);
    if (!user) return event;

    event.response.userAttributes = {
      email: user.email.S,
      email_verified: "true",
    };

    event.response.finalUserStatus = "CONFIRMED";
    event.response.messageAction = "SUPPRESS";
  }
  return event;
};
```
