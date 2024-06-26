import {
	FaChevronDown,
	FaAlignCenter,
	FaUsers,
	FaBuilding,
	FaCalendarCheck,
	FaTasks,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const Layout = () => {
	const fullName = localStorage.getItem("user");

	const handleLogout = async () => {
		Cookies.remove("refreshToken");
		localStorage.clear();

		window.location.href = "/";
	};
	return (
		<div className="relative">
			<header className="flex justify-between ml-8 mr-40 items-center py-4">
				<NavLink to={"/admin"} className={"z-10"}>
					<img
						src="/ndt-technologies-web-logo.svg"
						alt=""
						className="w-[30%]"
					/>
				</NavLink>
				<div className="profile flex items-center gap-x-3">
					<Popover>
						<PopoverTrigger className="flex items-center gap-4 text-[#d69436]">
							<b>{fullName}</b> <FaChevronDown />
						</PopoverTrigger>
						<PopoverContent className="flex items-center gap-4 w-fit">
							<NavLink to={"/"} onClick={handleLogout}>
								Log Out
							</NavLink>
						</PopoverContent>
					</Popover>
				</div>
			</header>
			<div className="side_menu absolute top-0 left-0 h-screen">
				<ul className="navMenu grid relative top-1/4 left-1/2 gap-y-4">
					<NavLink to={"/admin"} className={"flex items-center gap-x-2"}>
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
					<NavLink
						to={"/getTimesheets"}
						className={"flex items-center gap-x-2"}
					>
						<FaTasks />
						Timesheets
					</NavLink>
				</ul>
			</div>
		</div>
	);
};

export default Layout;
