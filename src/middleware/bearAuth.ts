import "dotenv/config";
import { Context, Next } from "hono";
import { verify } from "hono/jwt";

// bearAuth middleware to verify the jwt token
// and check if the user is authenticated
export const verifyToken = async (token: string, secret: string) => {
  try {
    // verify the token with the secret key
    const decode = await verify(token as string, secret);
    // return the decoded token
    return decode;
  } catch (error: any) {
    return null;
  }
};

// bearAuth middleware to verify the jwt token
// and check if the user is authenticated
export const authMiddleware = async (
  c: Context,
  next: Next,
  requiredRole: string
) => {
  try {
    // get the token from the request header
    const token = c.req.header("Authorization");

    // get the secret key from the env file
    let secret = process.env.JWT_SECRET as string;
    // check if the token is not present
    if (!token) {
      return c.json({ error: "token not found" }, 401);
    }

    // verify the token
    const decoded = await verifyToken(token, secret);
    // check if the token is not verified
    if (!decoded) {
      return c.json({ error: "token not verified" }, 401);
    }
    // check if the role is not the required role
    if (decoded.role !== requiredRole) {
      return c.json({ error: "unauthorized access" }, 401);
    }

    //pass the token and user object to the context
    // call the next middleware
    return next();
  } catch (error: any) {
    // catch any error and return the error message
    return c.json({ error: error?.message }, 400);
  }
};

// adminRoleAuth middleware to check if the user is authenticated
export const adminRoleAuth = async (c: Context, next: Next) => {
  // call the authMiddleware function with the required role
  await authMiddleware(c, next, "admin");
};

// userRoleAuth middleware to check if the user is authenticated
export const userRoleAuth = async (c: Context, next: Next) => {
  // call the authMiddleware function with the required role
  await authMiddleware(c, next, "user");
};
