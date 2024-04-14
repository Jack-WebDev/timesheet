import Layout from "@/components/Layout";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [totalProjects, setTotalProjects] = useState<number>(0);
	const [totalDepartments, setTotalDepartments] = useState<number>(0);

	useEffect(() => {
		getUsers();
		getDepartments();
		getProjects();
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

	return (
		<div className="relative">
			<Layout />

			<div className="dashboard__content grid grid-cols-2 w-fit mx-auto gap-8">
				<NavLink to={"/employees"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4">
								<FaUsers fill="#d69436" />
								Total Employees
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2>{totalUsers}</h2>
						</CardContent>
						<CardFooter>
							<p>Last Updated: </p>
						</CardFooter>
					</Card>
				</NavLink>
				<NavLink to={"/departments"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4">
								<FaUsers fill="#d69436" />
								Total Departments
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2>{totalDepartments}</h2>
						</CardContent>
						<CardFooter>
							<p>Last Updated: </p>
						</CardFooter>
					</Card>
				</NavLink>
				<NavLink to={"/projects"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4">
								<FaUsers fill="#d69436" />
								Total Projects
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2>{totalProjects}</h2>
						</CardContent>
						<CardFooter>
							<p>Last Updated: </p>
						</CardFooter>
					</Card>
				</NavLink>
				<NavLink to={"/timesheets"}>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-4">
								<FaUsers fill="#d69436" />
								Timesheet Approvals
							</CardTitle>
						</CardHeader>
						<CardContent>
							<h2>13</h2>
						</CardContent>
						<CardFooter>
							<p>Last Updated: </p>
						</CardFooter>
					</Card>
				</NavLink>
			</div>
		</div>
	);
};

export default Dashboard;
