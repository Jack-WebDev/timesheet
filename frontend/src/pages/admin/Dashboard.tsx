import Layout from "@/components/Layout";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { FaBuilding, FaCalendar, FaTasks, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const Dashboard = () => {
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [totalProjects, setTotalProjects] = useState<number>(0);
	const [totalDepartments, setTotalDepartments] = useState<number>(0);
	const [timesheets, setTimesheets] = useState<string[]>([]);

	useEffect(() => {
		getUsers();
		getDepartments();
		getProjects();
		getTimesheets()
	}, []);

	const getUsers = async () => {
		const res = await axios.get("api/users/");
		const users = res.data;
		setTotalUsers(users.length);
	};
	const getProjects = async () => {
		const res = await axios.get("api/projects/");
		const projects = res.data;
		setTotalProjects(projects.length);
	};
	const getDepartments = async () => {
		const res = await axios.get("api/departments/");
		const departments = res.data;
		setTotalDepartments(departments.length);
	};
	const getTimesheets = async () => {
		const res = await axios.get("api/timesheets/");
		const timesheets = res.data;
		setTimesheets(timesheets);
		console.log(timesheets.Approval_status)
	};

	const countPendingTimesheets = () => {
		return timesheets.filter((timesheet:any) => timesheet.Approval_Status === 'Pending').length;
	  };

	return (
		<div className="relative h-screen">
			<Layout />

			<div className="dashboard__content grid grid-cols-2 w-fit mx-auto gap-8 relative top-20">
				<NavLink to={"/employees"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
								<FaUsers fill="#d69436" fontSize={"2rem"}/>
								Total Employees
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2 className="font-semibold">{totalUsers}</h2>
						</CardContent>

					</Card>
				</NavLink>
				<NavLink to={"/departments"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
								<FaBuilding fill="#d69436" fontSize={"2rem"}/>
								Total Departments
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2 className="font-semibold">{totalDepartments}</h2>
						</CardContent>

					</Card>
				</NavLink>
				<NavLink to={"/projects"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
								<FaCalendar fill="#d69436" fontSize={"2rem"}/>
								Total Projects
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2 className="font-semibold">{totalProjects}</h2>
						</CardContent>

					</Card>
				</NavLink>
				<NavLink to={"/getTimesheets"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4 text-[#015a4a] font-bold">
								<FaTasks fill="#d69436" fontSize={"2rem"} />
								Timesheet Approvals
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2 className="font-semibold">{countPendingTimesheets()}</h2>
						</CardContent>

					</Card>
				</NavLink>
			</div>
		</div>
	);
};

export default Dashboard;
