const {
	userLogin,
	userRegister,
	createUser,
	getUsers,
	getUser,
	deleteUser,
	updateUser,
	logOutUser
} = require("../controllers/user");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.post("/",createUser)

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("logout", logOutUser)

userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter
