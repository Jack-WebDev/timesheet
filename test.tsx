const Timesheet = () => {
	const [rows, setRows] = useState<RowFormData[]>([
	  { project: "", task_performed: "", hours: [0, 0, 0, 0, 0] }
	]);
  
	const [projectNames, setProjectNames] = useState<string[]>([]);
  
	// Fetch project names on component mount
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
  
	const addRow = () => {
	  setRows([
		...rows,
		{ project: "", task_performed: "", hours: [0, 0, 0, 0, 0] }
	  ]);
	};
  
	const handleTaskChange = (index: number, value: string) => {
	  const updatedRows = [...rows];
	  updatedRows[index].task_performed = value;
	  setRows(updatedRows);
	};
  
	const handleHoursChange = (index: number, hourIndex: number, value: number) => {
	  const updatedRows = [...rows];
	  updatedRows[index].hours[hourIndex] = value;
	  setRows(updatedRows);
	};
  
	const handleSubmit = async () => {
	  try {
		const res = await axios.post("api/timesheets/create", {
		  rows: rows
		});
		console.log(res);
		// Optionally reset rows or show success message
	  } catch (error) {
		console.error("Error submitting timesheet:", error);
		// Handle error (e.g., show an error message)
	  }
	};
  
	return (
	  <div>
		{/* Your JSX and UI Components */}
		{rows.map((rowData, index) => (
		  <div key={index} className="row-form flex items-center justify-around my-4">
			{/* Render project dropdown, task input, and hours inputs */}
			<select
			  className="project_dropdown"
			  value={rowData.project}
			  onChange={(e) => handleProjectChange(index, e.target.value)}
			>
			  {/* Render project options */}
			</select>
			<input
			  type="text"
			  className="task_input border border-black mx-4 px-4"
			  value={rowData.task_performed}
			  onChange={(e) => handleTaskChange(index, e.target.value)}
			  placeholder="Task Performed..."
			/>
			{["Mon", "Tue", "Wed", "Thu", "Fri"].map((_, dayIndex) => (
			  <input
				key={dayIndex}
				className="hour_input w-1/6 mr-4"
				type="number"
				value={rowData.hours[dayIndex]}
				onChange={(e) => handleHoursChange(index, dayIndex, parseInt(e.target.value))}
			  />
			))}
			<div className="relative right-24">{rowData.hours.reduce((a, b) => a + b, 0)}</div>
		  </div>
		))}
		{/* Add Row Button */}
		<button onClick={addRow} className="bg-[#015a4a] text-white py-2 px-6 mt-8 rounded-xl">
		  Add Row
		</button>
		{/* Submit Button */}
		<button
		  type="submit"
		  onClick={handleSubmit}
		  className="rounded-xl bg-[#DDA83A] text-white gap-x-4 hover:bg-[#DDA83A] py-2 px-6 mb-4 mr-4"
		>
		  Submit
		</button>
	  </div>
	);
  };
  
  export default Timesheet;
  