const {
	userLogin,
	userRegister,
	getUser,
	deleteUser,
	updateUser,
} = require("../controllers/user");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter
