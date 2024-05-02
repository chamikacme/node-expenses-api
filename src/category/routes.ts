import express from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "./controller";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategoryController);

categoryRouter.get("/", getCategoriesController);

categoryRouter.get("/:id", getCategoryController);

categoryRouter.put("/:id", updateCategoryController);

categoryRouter.delete("/:id", deleteCategoryController);

export default categoryRouter;
