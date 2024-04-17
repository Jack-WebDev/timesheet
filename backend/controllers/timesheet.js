const db = require("../database/db");

const getAllTimesheets = async (req, res) => {
	try {
		const data = await db("timesheets").select();

		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
	}
};

const getTimesheet = async (req, res) => {
	const { id } = req.params;

	try {
		const data = await db("timesheets").select().where({ id: id });
		return res.status(200).json({ timesheet_id: data });
	} catch (error) {
		console.log(error);
	}
};

const createTimesheet = async (req, res) => {
	const { formData } = req.body;
	console.log(formData);

	await db("timesheets").insert({
		Full_Name: formData.fullName,
		Project_Name: formData.project,
		Task_performed: formData.task_performed,
		Week: formData.period,
		Monday: formData.hours[0],
		Tuesday: formData.hours[1],
		Wednesday: formData.hours[2],
		Thursday: formData.hours[3],
		Friday: formData.hours[4],
		Total_hours: formData.total_hours,
	});

	res.status(201).json("created timesheet");
};

const deleteTimesheet = async (req, res) => {
	const { id } = req.params;

	try {
		const data = db("timesheets").select().where({ id: id }).del();
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
	}
};

const updateTimesheet = async (req, res) => {
	const { id } = req.params;
	const { approval } = req.body;
	console.log(approval);

	try {
		const data = await db("timesheets").select().where({ id: id }).update({
			Approval_Status: approval,
		});

		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllTimesheets,
	getTimesheet,
	createTimesheet,
	deleteTimesheet,
	updateTimesheet,
};
