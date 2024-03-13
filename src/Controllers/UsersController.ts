import { Request, Response } from 'express';
import { ObjectId } from 'mongodb'; // Assume MongoDB for database operations
import { connectDB } from '../db/db.js';

const clientDB=await connectDB()
const usersCollection = clientDB.db("clientDB").collection("users");

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, email } = req.body;
    // Perform validation or use a schema validation library like Joi, Yup, or Zod
    const result = await usersCollection.insertOne({ id, name, email });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await usersCollection.findOne({ id: req.params.id });
    if (user) {
      res.json(user); // Wrapping in an array to match the expected result
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const result = await usersCollection.updateOne({ id: req.params.id }, { $set: { name, email } });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or data not changed' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await usersCollection.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
