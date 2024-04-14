import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "../../components/auth/Login";
import { RegisterForm } from "../../components/auth/Register";
import "./userAuth.css";

const userAuth = () => {
	return (
		<div className="userAuth h-screen flex items-center justify-around">
			<div className="left__column text-center">
				<div className="logo text-3xl mb-8">LOGO</div>
				<h1 className="text-2xl">Welcome to New Dawn 360</h1>
				<img src="/6974855_4380.jpg" alt="" />
			</div>
			<Tabs defaultValue="login" className="form__container w-[400px]">
				<TabsList className="tabs__header">
					<TabsTrigger value="login" className="login_tab">
						Login
					</TabsTrigger>
					<TabsTrigger value="register" className="register_tab">
						Register
					</TabsTrigger>
				</TabsList>

				<TabsContent value="login">
					<LoginForm />
				</TabsContent>
				<TabsContent value="register">
					<RegisterForm />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default userAuth;
