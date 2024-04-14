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

type User = {
	id: string;
};

export function EditDialog({ id }: User) {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("");
	const [role, setRole] = useState("");
	const [department, setDepartment] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const res = await axios.get("api/users/");
        console.log(res)
	};

	const handleSave = async () => {
		const res = await axios.put(`api/users/${id}`, {
			name,
			surname,
			email,
			password,
			department,
			status,
			role,
		});
		console.log(res);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={name}
							className="col-span-3"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="surname" className="text-right">
							Surname
						</Label>
						<Input
							id="surname"
							value={surname}
							className="col-span-3"
							onChange={(e) => setSurname(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							value={email}
							className="col-span-3"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input
							id="password"
							value={password}
							className="col-span-3"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="status" className="text-right">
							Status
						</Label>
						<Input
							id="status"
							value={status}
							className="col-span-3"
							onChange={(e) => setStatus(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="department" className="text-right">
							Department
						</Label>
						<Input
							id="department"
							value={department}
							className="col-span-3"
							onChange={(e) => setDepartment(e.target.value)}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<Input
							id="role"
							value={role}
							className="col-span-3"
							onChange={(e) => setRole(e.target.value)}
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
