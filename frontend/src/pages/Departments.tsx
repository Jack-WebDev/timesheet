import DepartmentTable from "@/components/tableUI/DepartmentTable";
import Layout from "@/components/Layout";

const Departments = () => {
	return (
		<div className="relative">
			<Layout />
			<div>
				<DepartmentTable />
			</div>
		</div>
	);
};

export default Departments;
