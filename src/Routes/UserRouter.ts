import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../Controllers/UsersController.js";

const UserRouter=Router()

UserRouter.route('/')
// GET all dishes
.get(getAllUsers)
// POST a new dish
.post(createUser);

UserRouter.route('/:id')
  // GET a single dish by ID
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

export default UserRouter

  