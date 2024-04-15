import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditDepartment } from "../dialogUI/EditDepartment";
import { AddDepartment } from "../dialogUI/AddDepartment";

type Department = {
	id: string;
	Department_Name: string;
	Total_Projects: string;
};

const departmentTable: React.FC = () => {
	const [departments, setdepartments] = useState<Department[]>([]);
	const [filteredDepartments, setfilteredDepartments] = useState<Department[]>(
		[]
	);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		fetchDepartments();
	}, []);

	const fetchDepartments = async () => {
		try {
			const response = await axios.get<Department[]>("api/departments/");
			setdepartments(response.data);
			setfilteredDepartments(response.data);
		} catch (error) {
			console.error("Error fetching departments:", error);
		}
	};

	const handleDelete = async (id: any) => {
		const res = await axios.delete(`api/departments/${id}`);
		fetchDepartments();
		console.log(res);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = departments.filter((department) =>
			department.Department_Name.toLowerCase().includes(searchTerm)
		);
		setfilteredDepartments(filtered);
	};

	return (
		<div className="w-1/2 mx-auto">
			<input
				type="text"
				placeholder="Filter by department..."
				className="w-full px-8 border border-black"
				value={filter}
				onChange={handleFilterChange}
			/>
			<AddDepartment />
			<table>
				<thead>
					<tr>
						<th>Department Name</th>
						<th>No. of projects</th>

						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredDepartments.map((department) => (
						<tr key={department.id}>
							<td>{department.Department_Name}</td>
							<td>{department.Total_Projects}</td>
							<td>
								<EditDepartment id={department.id} />
								<button onClick={() => handleDelete(department.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default departmentTable;
