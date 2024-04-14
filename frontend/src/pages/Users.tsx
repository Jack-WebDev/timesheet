import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { Payment, columns } from "../components/Columns";
import axios from "axios";
import Layout from "@/components/Layout";

// async function fetchData(): Promise<Payment[]> {
// 	// Simulated API call or actual API call here
// 	return [
// 		{
// 			id: "728ed52f",
// 			employee: "Jack",
// 			department: "I.T",
// 			status: "Contract",
// 			email: "m@example.com",
// 		},
// 		{
// 			id: "728ed52f",
// 			employee: "Tim",
// 			department: "H.R",
// 			status: "Part-time",
// 			email: "jack@example.com",
// 		},
// 		{
// 			id: "728ed52f",
// 			employee: "Zodwa",
// 			department: "H.R",
// 			status: "Part-time",
// 			email: "jack@example.com",
// 		},
// 		{
// 			id: "728ed52f",
// 			employee: "King",
// 			department: "H.R",
// 			status: "Part-time",
// 			email: "jack@example.com",
// 		},
// 		// Add more data items as needed
// 	];
// }
const Users = () => {
	const [data, setData] = useState<Payment[]>([]);

	useEffect(() => {
		const fetchDataAsync = async () => {
			try {
				const result = await axios.get("api/users/");
				setData(result.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchDataAsync();
	}, []);

	return (
		<div className="relative">
			<Layout />
			{data.length > 0 && <DataTable columns={columns} data={data} />}
		</div>
	);
};

export default Users;
