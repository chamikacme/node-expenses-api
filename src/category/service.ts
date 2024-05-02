import Category from "./models/Category";
import { HttpError } from "routing-controllers";

export const createCategory = async (name: string, userId: string) => {
  const category = await Category.create({ name, userId });

  return category;
};

export const getCategories = async (userId: string) => {
  const categories = await Category.find({ userId });

  return categories;
};

export const getCategory = async (id: string, userId: string) => {
  const category = await Category.findOne({ _id: id, userId });

  if (!category) {
    throw new HttpError(404, "Category not found");
  }

  return category;
};

export const updateCategory = async (
  id: string,
  name: string,
  userId: string
) => {
  const category = await Category.findOneAndUpdate(
    { _id: id, userId },
    { name },
    { new: true }
  );

  if (!category) {
    throw new HttpError(404, "Category not found");
  }

  return category;
};

export const deleteCategory = async (id: string, userId: string) => {
  const category = await Category.findOneAndDelete({ _id: id, userId });

  if (!category) {
    throw new HttpError(404, "Category not found");
  }

  return category;
};
