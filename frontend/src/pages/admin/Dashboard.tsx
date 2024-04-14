import Layout from "@/components/Layout";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { FaUsers } from "react-icons/fa";

const Dashboard = () => {
	return (
		<div className="relative">
			<Layout />

			<div className="dashboard__content grid grid-cols-2 w-fit mx-auto gap-8">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4">
							<FaUsers fill="#d69436" />
							Total Employees
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2>23</h2>
					</CardContent>
					<CardFooter>
						<p>Last Updated: </p>
					</CardFooter>
				</Card>
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
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4">
							<FaUsers fill="#d69436" />
							Total Projects
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2>23</h2>
					</CardContent>
					<CardFooter>
						<p>Last Updated: </p>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-x-4">
							<FaUsers fill="#d69436" />
							Total Departments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2>23</h2>
					</CardContent>
					<CardFooter>
						<p>Last Updated: </p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
