import express from 'express';
import {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish
} from '../Controllers/DishesController.js'; // Update the path as necessary

const DishesRouter = express.Router();

DishesRouter.route('/')
// Bind controllers to routes
.post(createDish) // Create a new dish
.get(getAllDishes); // Get all dishes

DishesRouter.route('/:id')
.get(getDishById) // Get a dish by ID
.put(updateDish)// Update a dish by ID
.delete(deleteDish); // Delete a dish by ID

export default DishesRouter;
