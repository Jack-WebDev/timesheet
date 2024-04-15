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
import { useState } from "react";
import axios from "axios";

export function AddDepartment() {
	const [Department_Name, setDepartment_Name] = useState("");
	const [isOpen, setIsOpen] = useState(false);


	const handleSave = async () => {
		await axios.post(`api/departments/`, {
			Department_Name,

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
					<DialogTitle>Add New Department</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Department Name
						</Label>
						<Input
							id="name"
							value={Department_Name}
							className="col-span-3"
							onChange={(e) => setDepartment_Name(e.target.value)}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Add Department
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
