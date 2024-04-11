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
		const user = await db("users").select().where({ email });

		validUser = user[0];

		const isPasswordValid = await comparePassword(password, validUser.password);

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

		res.json({
			success: true,
			role: validUser.role,
			name: validUser.name,
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

const getUser = async (req, res) => {
	try {
		const user = await db.select("*").from("users");

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { surname } = req.body;

	console.log(id, surname);

	try {
		const updated = await db("users").where({ id }).update({
			surname: surname,
		});

		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const updated = await db("users").where({ id }).delete();

		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { userLogin, userRegister, getUser, updateUser, deleteUser };
