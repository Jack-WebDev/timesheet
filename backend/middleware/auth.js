const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doesUserExist = async (email) => {
	try {
		const userEmail = await db("users").where({ email });

		return userEmail;
	} catch (error) {
		console.error(`Error checking user existence: ${error}`);
		throw error;
	}
};

const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		console.error(`Error hashing password: ${error}`);
		throw error;
	}
};

const comparePassword = async (password, hashedPassword) => {
	try {
		return await bcrypt.compare(password, hashedPassword);
	} catch (error) {
		console.error("Error comparing passwords:", error);
		throw error;
	}
};

const generateToken = (res, userID, userRole) => {
	const token = jwt.sign(
		{ userID: userID, userRole: userRole },
		process.env.JWT_KEY,
		{ expiresIn: "1h" }
	);

	res.cookie("jwt", token, {
		httpOnly: true,
		maxAge: 1 * 60 * 60 * 1000,
	});
};

const idAdmin = () => {};

module.exports = {
	generateToken,
	comparePassword,
	doesUserExist,
	hashPassword,
};
