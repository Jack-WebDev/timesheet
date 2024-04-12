const express = require("express");
const projectRouter = express.Router();

const {
	getProjects,
	createProject,
	getProject,
	updateProject,
	deleteProject,
} = require("../controllers/project");

projectRouter.get("/", getProjects);
projectRouter.post("/", createProject);
projectRouter.get("/:id", getProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

module.exports = projectRouter;
