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
import { toast } from "react-toastify";

type User = {
	id: string;
};

export function EditProject({ id }: User) {

	const [project, setProject] = useState("");

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		await axios.get("api/projects/");
	};

	const handleSave = async () => {
		try {
			await axios.put(`api/projects/${id}`, {
				Project_Name: project

			});
			window.location.reload()
		} catch (error) {
			console.log(error)
			toast.error("Error saving data")
		}

	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Project</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="projectName" className="text-right">
							Project Name
						</Label>
						<Input
							id="projectName"
							value={project}
							className="col-span-3"
							onChange={(e) => setProject(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
