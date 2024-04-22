const db = require("../database/db");

const getDepartments = async (req, res) => {
	try {
		const dept = await db("departments")
			.select("departments.id", "Department_Name")
			.count("projects.id as Total_Projects")
			.leftJoin("projects", "departments.id", "projects.Department_Id")
			.groupBy("departments.id", "departments.Department_Name");

		res.status(200).json(dept);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const createDepartment = async (req, res) => {
	const { Department_Name } = req.body;

	try {
		const deparName = await db("departments").insert({
			Department_Name: Department_Name,
		});

		res.status(201).json(deparName);
	} catch (error) {
		console.log(error);
	}
};

const getDepartment = async (req, res) => {
	const { id } = req.params;

	try {
		const getDepart = await db("departments").select().where({ id: id });
		res.status(200).json(getDepart);
	} catch (error) {
		console.log(error);
	}
};

const updateDepartment = async (req, res) => {
	const { id } = req.params;
	const { Department_Name } = req.body;

	try {
		const getDepart = await db("departments")
			.select()
			.where({ id: id })
			.update({
				Department_Name: Department_Name,
			});
		res.status(200).json(getDepart);
	} catch (error) {
		console.log(error);
	}
};

const deleteDepartment = async (req, res) => {
	const { id } = req.params;

	try {
		const getDepart = await db("departments").select().where({ id: id }).del();
		res.status(200).json("deleted");
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	getDepartments,
	createDepartment,
	getDepartment,
	updateDepartment,
	deleteDepartment,
};
