import express from "express";
import {
  createEntryController,
  getEntriesController,
  getEntryController,
  updateEntryController,
  deleteEntryController,
} from "./controller";

const entryRouter = express.Router();

entryRouter.post("/", createEntryController);

entryRouter.get("/", getEntriesController);

entryRouter.get("/:id", getEntryController);

entryRouter.put("/:id", updateEntryController);

entryRouter.delete("/:id", deleteEntryController);

export default entryRouter;
