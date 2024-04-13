"use client";

import { ColumnDef } from "@tanstack/react-table";
import {FaEdit, FaTrash} from "react-icons/fa"

export type Payment = {
	id: string;
	employee: string,
	department: string,
	email: string;
	status: string
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "employee",
		header: "Employee Name",
		
	},
	{
		accessorKey: "email",
		header: "Email"
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
					<p><FaEdit/> Edit</p>
					<p><FaTrash/> Delete</p>
				</div>
			);
		},
	},

];
