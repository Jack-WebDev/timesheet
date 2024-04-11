const db = require("../database/db");

const userLogin = async (req, res) => {
	res.status(200).json("logged in");
};

const userRegister = async (req, res) => {
	const { name, surname, email, password, role } = req.body;
	console.log(name, surname, password, email, role);
	try {
		const user = await db("users").insert({
			name: name,
			surname: surname,
			email: email,
			password: password,
			role: role,
		});

		res.status(200).json(user);
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

    console.log(id, surname)

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
		const updated = await db("users").where({ id }).delete()

		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { userLogin, userRegister, getUser, updateUser, deleteUser };
