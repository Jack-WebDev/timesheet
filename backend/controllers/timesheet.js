const db = require("../database/db");

const getAllTimesheets = async (req, res) => {
	const {
		user_id,
		project_id,
		task_performed,
		week,
		mon,
		tue,
		wed,
		thurs,
		fri,
		total_hours,
	} = req.body;

	console.log(
		user_id,
		project_id,
		task_performed,
		week,
		mon,
		tue,
		wed,
		thurs,
		fri,
		total_hours
	);
	res.status(200).json("Got timesheets");
};

const getTimesheet = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	res.status(200).json("Got timesheet");
};

const createTimesheet = async (req, res) => {
	const {
		user_id,
		project_id,
		task_performed,
		week,
		mon,
		tue,
		wed,
		thurs,
		fri,
		total_hours,
	} = req.body;
	console.log(
		user_id,
		project_id,
		task_performed,
		week,
		mon,
		tue,
		wed,
		thurs,
		fri,
		total_hours
	);

	res.status(201).json("created timesheet");
};

module.exports = { getAllTimesheets, getTimesheet, createTimesheet };
