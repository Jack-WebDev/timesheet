const {
	userLogin,
	userRegister,
	getUsers,
	getUser,
	deleteUser,
	updateUser,
	logOutUser
} = require("../controllers/user");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.get("/:id", getUser);
userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("logout", logOutUser)

module.exports = userRouter
