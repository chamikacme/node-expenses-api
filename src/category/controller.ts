import express from "express";
import { z } from "zod";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./service";

export const createCategoryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bodySchema = z.object({
      name: z.string().min(3).max(50).optional(),
    });

    const { name } = bodySchema.parse(req.body);

    const response = await createCategory(name, req.body.user.id);

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

export const getCategoriesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await getCategories(req.body.user.id);

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

export const getCategoryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categoryID = req.params.id;

    const response = await getCategory(categoryID, req.body.user.id);

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

export const updateCategoryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bodySchema = z.object({
      name: z.string().min(3).max(50).optional(),
    });

    const { name } = bodySchema.parse(req.body);

    const categoryID = req.params.id;

    const response = await updateCategory(categoryID, name, req.body.user.id);

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

export const deleteCategoryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categoryID = req.params.id;

    const response = await deleteCategory(categoryID, req.body.user.id);

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
