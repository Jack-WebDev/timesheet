const db = require("../database/db");

const getAllTimesheets = async (req, res) => {
	try {
		const data = await db("timesheets").select().returning("User_id")
		const id = data

		res.status(200).json(id)

	} catch (error) {
		console.log(error)
	}
};

const getTimesheet = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	res.status(200).json("Got timesheet");
};

const createTimesheet = async (req, res) => {
	const { formData } = req.body;
	console.log(formData);

	await db("timesheets").insert({
		User_id:formData.userID,
		Project_Name: formData.project,
		Task_performed: formData.task_performed,
		Week:formData.period,
		Monday: formData.hours[0],
		Tuesday: formData.hours[1],
		Wednesday: formData.hours[2],
		Thursday: formData.hours[3],
		Friday: formData.hours[4],
		Total_hours: formData.total_hours,
	});

	res.status(201).json("created timesheet");
};

module.exports = { getAllTimesheets, getTimesheet, createTimesheet };
