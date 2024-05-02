import User from "./models/User";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../security/service";
import { HttpError } from "routing-controllers";

export const register = async (
  fullName: string,
  password: string,
  email: string
) => {
  const userExists = await User.findOne({ email });

  if (!userExists) {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(user.id);

    user.password = undefined;

    return {
      user,
      token,
    };
  } else {
    throw new HttpError(400, "User already exists");
  }
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const isAuthenticated = await comparePassword(password, user.password);

  if (!isAuthenticated) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = await generateToken(user.id);

  user.password = undefined;

  return {
    user,
    token,
  };
};