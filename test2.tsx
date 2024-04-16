import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import DateRangeSelector from "@/components/timesheet/DatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
// import Card from "@/components/timesheet/Card";
type RowData = {
	hours: number[];
};

type RowFormData = {
	project: string;
	task_performed: string;
	hours: number[];
};

const Timesheet = () => {
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
		new Date()
	);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
		new Date()
	);
	const [rows, setRows] = useState<RowData[]>([{ hours: [0, 0, 0, 0, 0] }]); // Initialize with at least one row

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
		}
	};

	const calculateTotalHours = (): number => {
		return formData.hours.reduce((total, hour) => total + hour, 0);
	};

	const addRow = () => {
		setRows([...rows, { hours: [0, 0, 0, 0, 0] }]);
	};

	const handleUpdateDateRange = (startDate: Date, endDate: Date) => {
		setSelectedStartDate(startDate);
		setSelectedEndDate(endDate);
	};

	const handleLogout = async () => {
		Cookies.remove("refreshToken");
		localStorage.clear();

		window.location.href = "/";
	};

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
		<div>
			<header className="flex justify-around items-center py-4">
				<h1>NDT Logo</h1>
				<div className="profile flex items-center gap-x-3">
					<Popover>
						<PopoverTrigger className="flex items-center gap-4">
							Me <FaChevronDown />
						</PopoverTrigger>
						<PopoverContent className="flex items-center gap-4 w-fit">
							<NavLink to={"/"} onClick={handleLogout}>
								Log Out
							</NavLink>
						</PopoverContent>
					</Popover>
				</div>
			</header>

			<main>
				<div className="flex justify-center gap-x-12">
					<DateRangeSelector onUpdateDateRange={handleUpdateDateRange} />
				</div>
				<div className="timesheet__container">
					<div className="flex justify-around items-baseline">
						<div className="timesheet__details flex items-center justify-around mt-12">
							<div className="time__period flex items-center gap-x-4">
								<h2 className="font-semibold">Week:</h2>
								<span className="bg-[#dda83a] text-white p-2 rounded-xl">
									{selectedStartDate?.toLocaleDateString()} -{" "}
									{selectedEndDate?.toLocaleDateString()}
								</span>
							</div>
						</div>

						<button
							type="submit"
							className="rounded-xl bg-[#DDA83A] text-white gap-x-4 hover:bg-[#DDA83A] py-2 px-6 mb-4 mr-4"
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>

					<div className="project-card mt-12 border border-black m-auto p-4 rounded-xl">
						<div className="flex items-center justify-around">
							<div>Project</div>
							<div>Task</div>
							{["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
								<div key={index}>{day}</div>
							))}
							<div>Total Hours</div>
						</div>

						{rows.map((_row, index) => (
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
						))}
						<button
							onClick={addRow}
							className="bg-[#015a4a] text-white py-2 px-6 mt-8 rounded-xl"
						>
							Add Row
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Timesheet;
