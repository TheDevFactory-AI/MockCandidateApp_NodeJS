import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { connectDB } from '../db/db.js';

const clientDB=await connectDB()
const dishesCollection = clientDB.db("clientDB").collection("dishes");

export const createDish = async (req: Request, res: Response) => {
  try {
    const { id, name, description, price } = req.body;
    const result = await dishesCollection.insertOne({ id, name, description, price });
    res.status(201).json({ message: 'Dish added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding dish' });
  }
};

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await dishesCollection.find({}).toArray();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes' });
  }
};

export const getDishById = async (req: Request, res: Response) => {
  try {
    const dish = await dishesCollection.findOne({ id: req.params.id });
    if (dish) {
      res.json(dish);
    } else {
      res.status(404).json({ message: 'Dish not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dish' });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const result = await dishesCollection.updateOne({ id: req.params.id }, { $set: { name, description, price } });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Dish not found or data not changed' });
    }
    res.json({ message: 'Dish updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating dish' });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const result = await dishesCollection.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json({ message: 'Dish removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing dish' });
  }
};
//added explicity statuses to be sent