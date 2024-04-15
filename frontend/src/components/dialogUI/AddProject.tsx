import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

type Department = {
	id: string;
	Department_Name: string;
};

type Project = {
	Project_Name: string;

	Department: string;
}

export function AddProject() {
	const [Project_Name,setProject_Name] = useState("");
	const [department_id, setDepartment_id] = useState("")
	const [departments, setDepartments] = useState<Department[]>([]);


	useEffect(() => {
		fetchdepartments();
	}, []);

	const fetchdepartments = async () => {
		try {
			const response = await axios.get<Department[]>("api/departments/");
			setDepartments(response.data);
		} catch (error) {
			console.error("Error fetching departments:", error);
		}
	};

	const handleSave = async () => {
		await axios.post<Project>(`api/projects/`, {
			Project_Name: Project_Name,
			Department_Id: department_id

		});
		window.location.reload()
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">ADD</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Project</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Project Name
						</Label>
						<Input
							id="name"
							value={Project_Name}
							className="col-span-3"
							onChange={(e) => setProject_Name(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Department Name
						</Label>
						<select name="department" value={department_id} onChange={(e) => setDepartment_id(e.target.value)}>
							{departments.map((department) => (
								<option key={department.id} value={department.id}>
									{department.Department_Name}
								</option>
							))}
						</select>
					</div>
				</div>

				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Add Project
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
