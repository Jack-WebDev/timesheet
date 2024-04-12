import {
	FaChevronDown,
	FaAlignCenter,
	FaUsers,
	FaBuilding,
	FaCalendarCheck,
	FaTasks,
	FaDoorOpen,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const Dashboard = () => {
	return (
		<div className="relative">
			<header className="header flex justify-around items-center py-4">
				<h1>Hello Jack</h1>
				<div className="profile flex items-center gap-x-3">
					<Popover>
						<PopoverTrigger className="flex items-center gap-4">
							Jack <FaChevronDown />
						</PopoverTrigger>
						<PopoverContent className="flex items-center gap-4 w-fit">
							<NavLink to={"/"}>
								Log Out <FaDoorOpen />
							</NavLink>
						</PopoverContent>
					</Popover>
				</div>
			</header>

			<div className="side_menu absolute top-0 left-0 h-screen">
				<ul className="navMenu grid relative top-1/4 left-1/2 gap-y-4">
					<NavLink to={"/"} className={"flex items-center gap-x-2"}>
						<FaAlignCenter />
						Dashboard
					</NavLink>
					<NavLink to={"/employees"} className={"flex items-center gap-x-2"}>
						<FaUsers />
						Employees
					</NavLink>
					<NavLink to={"/departments"} className={"flex items-center gap-x-2"}>
						<FaBuilding />
						Departments
					</NavLink>
					<NavLink to={"/projects"} className={"flex items-center gap-x-2"}>
						<FaCalendarCheck />
						Projects
					</NavLink>
					<NavLink to={"/timesheets"} className={"flex items-center gap-x-2"}>
						<FaTasks />
						Timesheets
					</NavLink>
				</ul>
			</div>

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
