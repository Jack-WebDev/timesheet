const {
	getAllTimesheets,
	createTimesheet,
	getTimesheet,
	deleteTimesheet,
	updateTimesheet,
} = require("../controllers/timesheet");

const express = require("express");
const timesheetRouter = express.Router();

timesheetRouter.get("/", getAllTimesheets);
timesheetRouter.post("/create", createTimesheet);
timesheetRouter.get("/:id", getTimesheet);
timesheetRouter.post("/:id", deleteTimesheet);
timesheetRouter.post("/:id", updateTimesheet);

module.exports = timesheetRouter;
