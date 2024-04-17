const {
	getAllTimesheets,
	createTimesheet,
	getTimesheet,
	deleteTimesheet,
	updateTimesheet,
} = require("../controllers/timesheet");

const express = require("express");
// const { isAdmin } = require("../middleware/protectRoute");
const timesheetRouter = express.Router();

timesheetRouter.get("/", getAllTimesheets);
timesheetRouter.post("/create", createTimesheet);
timesheetRouter.get("/:id", getTimesheet);
timesheetRouter.delete("/:id", deleteTimesheet);
timesheetRouter.put("/:id", updateTimesheet);

module.exports = timesheetRouter;
