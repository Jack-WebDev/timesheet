import React, { useState, useEffect } from "react";
import axios from "axios";

interface RowFormData {
	project: string;
	task_performed: string;
	hours: number[];
}

const Row: React.FC = () => {
	const [formData, setFormData] = useState<RowFormData>({
		project: "",
		task_performed: "",
		hours: [0, 0, 0, 0, 0],
	});

	const [projectNames, setProjectNames] = useState<string[]>([]);

	useEffect(() => {
		fetchProjectNames();
	}, []);

	const fetchProjectNames = async () => {
		try {
			const response = await axios.get("api/projects/");
			const projectNamesArray = response.data.map(
				(project: { Project_Name: string }) => project.Project_Name
			);
			setProjectNames(projectNamesArray);
		} catch (error) {
			console.error("Error fetching project names:", error);
			// Handle error (e.g., show an error message)
		}
	};

	const calculateTotalHours = (): number => {
		return formData.hours.reduce((total, hour) => total + hour, 0);
	};

	// const handleProjectChange = (value: string) => {
	// 	setFormData({ ...formData, project: value });
	// };

	const handleTaskChange = (value: string) => {
		setFormData({ ...formData, task_performed: value });
	};

	const handleHoursChange = (index: number, value: number) => {
		const newHours = [...formData.hours];
		newHours[index] = value;
		setFormData({ ...formData, hours: newHours });
	};

	const handleSubmit = async () => {
		// Calculate total hours
		const totalHours = calculateTotalHours();

		// Update formData with total hours
		const updatedFormData = {
			...formData,
			hours: [...formData.hours], // Make a copy of hours array
		};
		updatedFormData.hours.push(totalHours); // Append total hours to the end of hours array

		try {
			const res = await axios.post("api/timesheets/create", {
				formData: updatedFormData,
			});

			console.log(res, formData);

			// If successful, you may want to reset the form or show a success message
			setFormData({
				project: "",
				task_performed: "",
				hours: [0, 0, 0, 0, 0],
			});

			// Optionally, fetch updated project names after submitting
			fetchProjectNames();
		} catch (error) {
			console.error("Error submitting timesheet:", error);
			// Handle error (e.g., show an error message)
		}
	};

	return (
		<>
			<div className="row-form flex items-center justify-around my-4">
				<select className="project_dropdown">
					<option value="">Select Project</option>
					{projectNames.map((projectName, index) => (
						<option key={index} value={projectName}>
							{projectName}
						</option>
					))}
				</select>
				<input
					type="text"
					className="task_input border border-black mx-4 px-4"
					value={formData.task_performed}
					onChange={(e) => handleTaskChange(e.target.value)}
					placeholder="Task Performed..."
				/>
				<div className="days">
					{["Mon", "Tue", "Wed", "Thu", "Fri"].map((_day, index) => (
						<input
							key={index}
							className="hour_input w-1/6 mr-4"
							type="number"
							value={formData.hours[index]}
							onChange={(e) =>
								handleHoursChange(index, parseInt(e.target.value))
							}
						/>
					))}
				</div>
				<div className="relative right-24">{calculateTotalHours()}</div>
			</div>
			<button
				type="submit"
				className="rounded-xl bg-[#DDA83A] text-white gap-x-4 hover:bg-[#DDA83A] py-2 px-6 mb-4 mr-4"
				onClick={handleSubmit}
			>
				Submit
			</button>
		</>
	);
};

export default Row;
