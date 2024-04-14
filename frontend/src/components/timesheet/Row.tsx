import React, { useState, useEffect } from "react";
import axios from "axios";

interface RowFormData {
	project: string;
	task: string;
	hours: number[];
}

const Row: React.FC = () => {
	const [formData, setFormData] = useState<RowFormData>({
		project: "",
		task: "",
		hours: [0, 0, 0, 0, 0],
	});

	const [projectNames, setProjectNames] = useState<string[]>([]);

	console.log(projectNames);

	useEffect(() => {
		fetchProjectNames();
	}, []);

	const fetchProjectNames = async () => {
		try {
		  const response = await axios.get('/api/projects'); // Adjust the URL based on your backend API endpoint
		  const projectNamesArray = response.data.map((project: { Project_Name: string; }) => project.Project_Name);
		  setProjectNames(projectNamesArray);
		} catch (error) {
		  console.error('Error fetching project names:', error);
		  // Handle error (e.g., show an error message)
		}
	  };

	const calculateTotalHours = (): number => {
		return formData.hours.reduce((total, hour) => total + hour, 0);
	};

	const handleProjectChange = (value: string) => {
		setFormData({ ...formData, project: value });
	};

	const handleTaskChange = (value: string) => {
		setFormData({ ...formData, task: value });
	};

	const handleHoursChange = (index: number, value: number) => {
		const newHours = [...formData.hours];
		newHours[index] = value;
		setFormData({ ...formData, hours: newHours });
	};

	return (
		<div className="row-form">
			<div>Project</div>
			{/* Render project names in a dropdown */}
			<select>
				{projectNames.map((projectName, index) => (
					<option key={index} value={projectName}>
						{projectName}
					</option>
				))}
			</select>
			<input
				type="text"
				value={formData.task}
				onChange={(e) => handleTaskChange(e.target.value)}
				placeholder="Task"
			/>
			{["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
				<input
					key={index}
					type="number"
					value={formData.hours[index]}
					onChange={(e) => handleHoursChange(index, parseInt(e.target.value))}
				/>
			))}
			<div>{calculateTotalHours()}</div>
		</div>
	);
};

export default Row;
