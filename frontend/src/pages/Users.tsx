import Layout from "@/components/Layout";
import UserTable from "@/components/tableUI/UserTable";

const Users = () => {
	return (
		<>
			<div className="relative">
				<Layout />
			</div>

			<UserTable />
		</>
	);
};

export default Users;
