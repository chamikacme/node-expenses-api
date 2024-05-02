import { EntryType } from "./enums/EntryType";
import Entry from "./models/Entry";
import { getCategories } from "../category/service";
import CustomError from "../utils/CustomError";

export const createEntry = async (
  title: string,
  amount: number,
  type: EntryType,
  category: string,
  userId: string
) => {
  const entry = await Entry.create({ title, amount, type, category, userId });

  return entry;
};

export const getEntries = async (
  userId: string,
  page: number,
  limit: number
) => {
  const entries = await Entry.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Entry.countDocuments({ userId });

  const categories = await getCategories(userId);

  const entriesWithCategories = entries.map((entry) => {
    const category = categories.find(
      (category) => category._id.toString() === entry.category.toString()
    );

    return {
      ...entry.toJSON(),
      categoryName: category ? category.name : "Uncategorized",
    };
  });

  const pagination = {
    totalEntries: total,
    itemsPerPage: limit,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };

  return { entries: entriesWithCategories, pagination };
};

export const getEntry = async (id: string, userId: string) => {
  const entry = await Entry.findOne({ _id: id, userId });

  if (!entry) {
    throw new CustomError("Entry not found", 404);
  }

  return entry;
};

export const updateEntry = async (
  id: string,
  title: string,
  amount: number,
  type: EntryType,
  category: string,
  userId: string
) => {
  const entry = await Entry.findOneAndUpdate(
    { _id: id, userId },
    { title, amount, type, category },
    { new: true }
  );

  if (!entry) {
    throw new CustomError("Entry not found", 404);
  }

  return entry;
};

export const deleteEntry = async (id: string, userId: string) => {
  const entry = await Entry.findOneAndDelete({ _id: id, userId });

  if (!entry) {
    throw new CustomError("Entry not found", 404);
  }

  return entry;
};
