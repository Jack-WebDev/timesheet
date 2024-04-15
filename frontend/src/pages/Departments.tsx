import UserTable from "@/components/tableUI/DepartmentTable";
import Layout from "@/components/Layout";

const Departments = () => {
	return (
		<div className="relative">
			<Layout />
			<h1>Department</h1>
			<div>
				<UserTable />
			</div>
		</div>
	);
};

export default Departments;
