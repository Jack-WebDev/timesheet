const db = require("../database/db");
const dotenv = require("dotenv");
dotenv.config();
const { comparePassword, hashPassword } = require("../middleware/auth");
const isValidEmailDomain = require("../utils/validateEmail");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { saveRefreshToken } = require("../utils/refreshToken");

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	console.log(email);

	if (!isValidEmailDomain(email, "ndt.co.za")) {
		return res.status(309).json({ message: "Invalid NDT email" });
	}

	try {
		const user = await db("users").select().where({ Email: email });

		validUser = user[0];
		console.log(validUser);

		const isPasswordValid = await comparePassword(password, validUser.Password);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: validUser.id, role: validUser.role },
			process.env.JWT_KEY,
			{ expiresIn: "10s" }
		);

		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: 15 * 1000,
			sameSite: "strict",
		});

		const refresh_token = jwt.sign(
			{ id: validUser.id, role: validUser.role },
			"khkjhdkgeq",
			{ expiresIn: "30d" }
		);

		res.cookie("refreshToken", refresh_token, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		saveRefreshToken(db, refresh_token);

		res.json({
			success: true,
			role: validUser.Role,
			name: validUser.Name,
			refreshToken: refresh_token,
			token: token,
		});
	} catch (error) {
		console.log(error);
	}
};

const userRegister = async (req, res) => {
	const { email, password } = req.body;
	console.log(password);

	if (!isValidEmailDomain(email, "ndt.co.za")) {
		return res.status(309).json({ message: "Invalid NDT email" });
	}

	if (!validator.isStrongPassword(password)) {
		return res.status(309).json({ message: "Password not strong enough" });
	}

	try {
		const hashedPassword = await hashPassword(password);
		console.log(hashedPassword);
		const user = await db("users").where({ email: email }).update({
			password: hashedPassword,
		});

		res.status(201).json(user);
	} catch (error) {
		console.log(error);
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await db.select().from("users");

		return res.status(200).json(users)
	} catch (error) {
		console.log(error);
	}
};

const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await db.select("*").from("users").where({ id: id });

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, surname, password, role } = req.body;

	try {
		if (!validator.isStrongPassword(password)) {
			return res.status(309).json({ message: "Password not strong enough" });
		}
		const hashedPassword = await hashPassword(password);
		const updated = await db("users").where({ id }).update({
			name: name,
			surname: surname,
			password: hashedPassword,
			role: role,
		});

		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const updated = await db("users").where({ id: id }).del();

		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
	}
};

const logOutUser = async (req, res) => {
	res.clearCookie("jwt");
	res.clearCookie("refreshToken");
	res.status(200).json({ message: "User Logged out!" });
  };

module.exports = {
	userLogin,
	userRegister,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	logOutUser
};
