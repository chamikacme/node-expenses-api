import express from "express";
import {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} from "./service";
import { z } from "zod";
import { EntryType } from "./enums/EntryType";

export const createEntryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bodySchema = z.object({
      title: z.string().min(3).max(50),
      amount: z.number().min(1),
      type: z.enum([EntryType.EXPENSE, EntryType.INCOME]),
      category: z.string().min(3).max(50),
    });

    const { title, amount, type, category } = bodySchema.parse(req.body);

    const response = await createEntry(
      title,
      amount,
      type,
      category,
      req.body.user.id
    );

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

export const getEntriesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const response = await getEntries(req.body.user.id, page, limit);

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

export const getEntryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const entryID = req.params.id;

    const response = await getEntry(entryID, req.body.user.id);

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

export const updateEntryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bodySchema = z.object({
      title: z.string().min(3).max(50),
      amount: z.number().min(1),
      type: z.enum([EntryType.EXPENSE, EntryType.INCOME]),
      category: z.string().min(3).max(50),
    });

    const { title, amount, type, category } = bodySchema.parse(req.body);

    const entryID = req.params.id;

    const response = await updateEntry(
      entryID,
      title,
      amount,
      type,
      category,
      req.body.user.id
    );

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

export const deleteEntryController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const entryID = req.params.id;

    const response = await deleteEntry(entryID, req.body.user.id);

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
