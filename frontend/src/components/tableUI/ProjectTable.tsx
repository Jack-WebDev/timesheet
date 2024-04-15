import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditProject } from "../dialogUI/EditProject";
import { AddProject } from "../dialogUI/AddProject";

type Project = {
	id: string;
	Project_Name: string;

	Department: string;
};

const ProjectTable: React.FC = () => {
	const [projects, setprojects] = useState<Project[]>([]);
	const [filteredprojects, setFilteredprojects] = useState<Project[]>([]);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		fetchprojects();
	}, []);

	const fetchprojects = async () => {
		try {
			const response = await axios.get<Project[]>("api/projects/");
			setprojects(response.data);
			setFilteredprojects(response.data);
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	};

	const handleDelete = async (id: any) => {
		const res = await axios.delete(`api/projects/${id}`);
		fetchprojects();
		console.log(res);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = projects.filter((project) =>
			project.Project_Name.toLowerCase().includes(searchTerm)
		);
		setFilteredprojects(filtered);
	};

	return (
		<div className="w-1/2 mx-auto">
			<input
				type="text"
				placeholder="Filter by project name..."
				className="w-full px-8 border border-black"
				value={filter}
				onChange={handleFilterChange}
			/>
			<AddProject />
			<table>
				<thead>
					<tr>
						<th>Project Name</th>

						<th>Department</th>

						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredprojects.map((project) => (
						<tr key={project.id}>
							<td>{project.Project_Name}</td>

							<td>{project.Department}</td>

							<td>
								<EditProject id={project.id} />
								<button onClick={() => handleDelete(project.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectTable;
