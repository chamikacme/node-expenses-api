import express from "express";
import { z } from "zod";
import { register as registerService, login as loginService } from "./service";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const bodySchema = z.object({
      fullName: z.string().min(3),
      password: z.string().min(6),
      email: z.string().email(),
    });

    const { fullName, password, email } = bodySchema.parse(req.body);

    const response = await registerService(fullName, password, email);

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const response = await loginService(email, password);

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const validateToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = req.body.user;

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
