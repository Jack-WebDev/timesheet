const db = require("../database/db");

const getProjects = async (req, res) => {
	try {
		const projectsWithDepartments = await db("projects")
			.select(
				"projects.id",
				"Project_Name",
				"departments.id as Department_Id",
				"departments.Department_Name"
			)
			.leftJoin("departments", "departments.id", "projects.Department_Id")
			.groupBy("projects.id", "departments.id", "departments.Department_Name");

		console.log(projectsWithDepartments); // Log the query results

		res.status(200).json(projectsWithDepartments);
	} catch (error) {
		console.log(error);
	}
};

const createProject = async (req, res) => {
	const { Project_Name, Department_Id } = req.body;
	console.log(Project_Name, Department_Id);

	try {
		const projectName = await db("projects").insert({
			Project_Name: Project_Name,
			Department_Id: Department_Id,
		});

		res.status(201).json(projectName);
	} catch (error) {
		console.log(error);
	}
};

const getProject = async (req, res) => {
	const { id } = req.params;

	try {
		const get_project = await db("projects").select().where({ id: id });
		res.status(200).json(get_project);
	} catch (error) {
		console.log(error);
	}
};

const updateProject = async (req, res) => {
	const { id } = req.params;
	const { Project_Name } = req.body;
	console.log(Project_Name);

	try {
		const get_project = await db("projects").select().where({ id: id }).update({
			Project_Name: Project_Name,
		});
		res.status(200).json(get_project);
	} catch (error) {
		console.log(error);
	}
};

const deleteProject = async (req, res) => {
	const { id } = req.params;

	try {
		await db("projects").select().where({ id: id }).del();
		res.status(200).json("deleted");
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	getProjects,
	createProject,
	getProject,
	updateProject,
	deleteProject,
};
