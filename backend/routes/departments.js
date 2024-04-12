const express = require("express");
const departmentRouter = express.Router();

const {
	getDepartments,
	createDepartment,
	getDepartment,
    updateDepartment,
    deleteDepartment
} = require("../controllers/department");

departmentRouter.get("/", getDepartments);
departmentRouter.post("/", createDepartment);
departmentRouter.get("/:id", getDepartment);
departmentRouter.put("/:id",updateDepartment)
departmentRouter.delete("/:id",deleteDepartment)

module.exports = departmentRouter;
