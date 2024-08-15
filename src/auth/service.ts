import User from "./models/User";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../security/service";
import CustomError from "../utils/CustomError";

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
    throw new CustomError("User already exists", 400);
  }
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isAuthenticated = await comparePassword(password, user.password);

  if (!isAuthenticated) {
    throw new CustomError("Invalid password", 400);
  }

  const token = await generateToken(user.id);

  user.password = undefined;

  const newUser = {
    ...user,
    role: "admin",
  };

  return {
    newUser,
    token,
  };
};