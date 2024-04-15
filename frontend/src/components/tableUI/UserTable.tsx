import React, { useState, useEffect } from "react";
import axios from "axios";
import {EditUser} from "../dialogUI/EditUser"
import {AddUser} from "../dialogUI/AddUser"
import {toast} from "react-toastify"



type User = {
	id: string;
	Name: string;
	Surname: string;
	Email: string;
    Password:string,
	Department: string;
	Status: string;
	Role: string;
};

const UserTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get<User[]>("api/users/");
			setUsers(response.data);
			setFilteredUsers(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
			toast.error("Error fetching users. Please try again")
		}
	};

	const handleDelete = async (id: any) => {
		const res = await axios.delete(`api/users/${id}`);
        fetchUsers()
		console.log(res);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setFilter(searchTerm);
		const filtered = users.filter(
			(user) =>
				user.Name.toLowerCase().includes(searchTerm) ||
				user.Department.toLowerCase().includes(searchTerm) ||
				user.Status.toLowerCase().includes(searchTerm)
		);
		setFilteredUsers(filtered);
	};



	return (
		<div className="w-1/2 mx-auto">
			<input
				type="text"
				placeholder="Filter by name, department, or status..."
                className="w-full px-8 border border-black"
				value={filter}
				onChange={handleFilterChange}
			/>
            <AddUser/>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Surname</th>
						<th>Email</th>
						<th>Department</th>
						<th>Status</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<tr key={user.id}>
							<td>{user.Name}</td>
							<td>{user.Surname}</td>
							<td>{user.Email}</td>
							<td>{user.Department}</td>
							<td>{user.Status}</td>
							<td>{user.Role}</td>
							<td>
								<EditUser id={user.id}/>
								<button onClick={() => handleDelete(user.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
