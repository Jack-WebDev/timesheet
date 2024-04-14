import Layout from "@/components/Layout";
import UserTable from "@/components/UserTable";

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
