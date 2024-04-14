import UserTable from "@/components/DepartmentTable";
import Layout from "@/components/Layout";

const Departments = () => {
	return (
		<div className="relative">
			<Layout />
			<div>
				<UserTable />
			</div>
		</div>
	);
};

export default Departments;
