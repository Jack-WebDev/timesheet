import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "../../components/auth/Login";
import { RegisterForm } from "../../components/auth/Register";
import "./userAuth.css";

const userAuth = () => {
	return (
		<div className="userAuth h-screen flex items-center justify-around">
			<div className="left__column text-center">
				<img src="/6974855_4380.jpg" alt="" />
			</div>
					<img
						src="/ndt-technologies-web-logo.svg"
						className="w-[10%] absolute top-4 left-8"
						alt=""
					/>
			<div>
				<div className="intro grid justify-items-center relative bottom-12">
					<h1 className="text-[2rem] mt-8 text-[#015a4a] font-semibold">New Dawn <span className="text-[#dda83a]">360</span></h1>
					<p className="text-[#015a4a] font-medium">Your Time, Our Commitment, Streamlined Together.</p>
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
		</div>
	);
};

export default userAuth;
