import db from "../drizzle/db";
import { authTokens, TIAuthTokens, TSAuthTokens } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (
  user: TIAuthTokens
): Promise<string | null> => {
  await db.insert(authTokens).values(user);

  return "user created successfully! 👽";
};

export const userLoginService = async (user: TSAuthTokens) => {
  // get the username and password from the user object
  const { username, password } = user;

  // get the user from the database
  return await db.query.authTokens.findFirst({
    columns: {
      username: true,
      role: true,
      password: true,
    },
    where: sql`${authTokens.username} = ${username}`,
    with: {
      user: {
        columns: {
          name: true,
          contact_phone: true,
          email: true,
          id: true,
        },
      },
    },
  });
};
