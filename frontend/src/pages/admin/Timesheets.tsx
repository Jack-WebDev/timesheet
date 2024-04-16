import { useEffect, useState } from "react";
import axios from "axios";

type Timesheet = {
	Friday: string;
	Monday: string;
	Project_Name: string;
	Task_performed: string;
	Thursday: string;
	Total_hours: string;
	Tuesday: string;
	Wednesday: string;
	Week: string;
	Full_Name: string;
	id: string;
};

const Timesheets = () => {
	const [timesheets, setTimesheets] = useState<Timesheet[]>([]); // Define a type for timesheets if possible

	useEffect(() => {
		const fetchTimesheets = async () => {
			try {
				const response = await axios.get("api/timesheets");

				setTimesheets(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchTimesheets();
	}, []);

	return (
		<div>
			{timesheets.map((timesheet) => (
				<div className="card__container mb-12" key={timesheet.id}>
					<>
						<div className="card__head">
							<h1>Full Name: {timesheet.Full_Name}</h1>
							<h2>Project Name: {timesheet.Project_Name}</h2>
						</div>
						<div className="card__body">
							<div>
								<h2>Task Performed: {timesheet.Task_performed}</h2>
								<h3>Calendar Week: {timesheet.Week}</h3>
							</div>

							<div className="week-days__container">
								<h4>Daily Hours</h4>

								<div className="week-days grid">
									<span>Monday: {timesheet.Monday} hours</span>
									<span>Tuesday: {timesheet.Tuesday} hours</span>
									<span>Wednesday: {timesheet.Wednesday} hours</span>
									<span>Thursday: {timesheet.Thursday} hours</span>
									<span>Friday: {timesheet.Friday} hours</span>
								</div>
								<h4>Total hours worked: {timesheet.Total_hours}</h4>
							</div>
						</div>
					</>
				</div>
			))}
		</div>
	);
};

export default Timesheets;
