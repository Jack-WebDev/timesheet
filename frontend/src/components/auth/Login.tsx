import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
	email: z.string().min(2, {
		message: "Not a valid NDT email",
	}),
	password: z.string(),
});

export function LoginForm() {
	const [authenticated, setAuthenticated] = useState(false);
	const [role, setRole] = useState("");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await axios.post("api/users/login", { ...values });

			const { id,success, role, name, token } = res.data;

			console.log(id,success, role, name, token);

			if (success) {
				setAuthenticated(true);
				setRole(role);
				localStorage.setItem("user",id );
			}
		} catch (error) {
			console.log(error);
		}
	}
	if (authenticated) {
		if (role === "Employee" || role === "Manager") {
			return <Navigate to="/employee" />;
		} else if (role === "Admin") {
			return <Navigate to="/admin" />;
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Enter your password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="login_btn w-full">
					Let Me In
				</Button>
			</form>
		</Form>
	);
}
