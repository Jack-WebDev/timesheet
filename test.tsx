"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

export type Payment = {
	id: string;
	Name: string;
	department: string;
	Email: string;
	status: string;
};

const getUsers = async () => {
	try {
		const res = await axios.get("api/users");
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};

useEffect(() => {
	getUsers();
}, []);

const handleDelete = async () => {
	try {
		const res = await axios.delete("api/users");
	} catch (error) {
		console.log(error);
	}
	console.log("Delete");
};

const handleEdit = () => {
	console.log("Edit");
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "Name",
		header: "Employee Name",
	},
	{
		accessorKey: "Email",
		header: "Email",
	},
	{
		accessorKey: "department",
		header: "Department Name",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		id: "actions",
		accessorKey: "actions",
		header: "Actions",
		cell: () => {
			return (
				<div className="flex items-center gap-x-4">
					<button onClick={handleEdit}>
						<FaEdit /> Edit
					</button>
					<button onClick={handleDelete}>
						<FaTrash /> Delete
					</button>
				</div>
			);
		},
	},
];
