import { Context } from "hono";
import "dotenv/config";
import { createAuthUserService, userLoginService } from "./auth.service";
import * as bcrypt from "bcrypt";
import { sign } from "hono/jwt";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const pass = user.password;
    const hashedPassword = await bcrypt.hash(pass, 10);
    user.password = hashedPassword;

    const createdUser = await createAuthUserService(user);

    if (!createdUser) {
      return c.text("user not created!👽", 404);
    }
    return c.json({ msg: createdUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
export const loginUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    // check if the user exist
    const userExist = await userLoginService(user);
    // check if the user exist in the database or not
    if (userExist === null) {
      return c.json({ error: "user not found" }, 404);
    }

    // compare the password with the hashed password
    const userMatch = await bcrypt.compare(
      user.password,
      userExist?.password as string
    );
    if (!userMatch) {
      return c.json({ error: "password does not match" }, 400);
    } else {
      // create the payload for the jwt token
      const payload = {
        sub: userExist?.username,
        role: userExist?.role,
        exp: Math.floor(Date.now() / 1000) + 120 * 180, //
      };

      let secret = process.env.JWT_SECRET as string; // secret key for jwt
      const token = await sign(payload, secret); // sign the token with the payload and secret key
      let user = userExist?.user; // get the user from the userExist object
      let role = userExist?.role; // get the role from the userExist object
      return c.json({ token, user: { role, ...user } }, 200); // return the token and user object
    }
  } catch (error: any) {
    // catch any error and return the error message
    return c.json({ error: error?.message }, 400);
  }
};
