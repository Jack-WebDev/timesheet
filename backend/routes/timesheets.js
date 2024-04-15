const {
    getAllTimesheets,createTimesheet, getTimesheet
} = require("../controllers/timesheet");

const express = require("express");
const timesheetRouter = express.Router();



timesheetRouter.get("/",getAllTimesheets)
timesheetRouter.post("/",createTimesheet)
timesheetRouter.get("/:id",getTimesheet)


module.exports = timesheetRouter