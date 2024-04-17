const db = require("../database/db");
const dotenv = require("dotenv");
dotenv.config();
const { comparePassword, hashPassword } = require("../middleware/auth");
const isValidEmailDomain = require("../utils/validateEmail");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!isValidEmailDomain(email, "ndt.co.za")) {
		return res.status(309).json({ message: "Invalid NDT email" });
	}

	try {
		const user = await db("users").select().where({ Email: email });

		validUser = user[0];

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
			{ expiresIn: "1d" }
		);

		res.cookie("refreshToken", refresh_token, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000,
		});


		res.json({
			surname:validUser.Surname,
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

	if (!isValidEmailDomain(email, "ndt.co.za")) {
		return res.status(309).json({ message: "Invalid NDT email" });
	}

	if (!validator.isStrongPassword(password)) {
		return res.status(309).json({ message: "Password not strong enough" });
	}

	try {
		const hashedPassword = await hashPassword(password);
		const user = await db("users").where({ email: email }).update({
			password: hashedPassword,
		});

		res.status(201).json(user);
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	const { name, surname, email, password, status, role, department } = req.body;

	if (!isValidEmailDomain(email, "ndt.co.za")) {
		return res.status(309).json({ message: "Invalid NDT email" });
	}

	try {
		const data = await db("users").insert({
			Name: name,
			Surname: surname,
			Email: email,
			Password: password,
			Department: department,
			Status: status,
			Role: role,
		});

		res.status(201).json(data);
	} catch (error) {
		console.log(error);
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await db.select().from("users");

		return res.status(200).json(users);
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
	const { name, surname, email, department, password, role, status } = req.body;

	try {
		if (!validator.isStrongPassword(password)) {
			return res.status(309).json({ message: "Password not strong enough" });
		}
		const hashedPassword = await hashPassword(password);
		const updated = await db("users").where({ id }).update({
			Name: name,
			Surname: surname,
			Email: email,
			Password: hashedPassword,
			Department: department,
			Status: status,
			Role: role,
		});

		return res.status(200).json(updated);
	} catch (error) {
		return res.status(500).json({ error: error });
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
	return res.status(200).json({ message: "User Logged out!" });
};

module.exports = {
	userLogin,
	userRegister,
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	logOutUser,
	
};
