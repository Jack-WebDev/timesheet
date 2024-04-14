import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/userAuth.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Departments from "./pages/Departments.tsx";
import Projects from "./pages/Projects.tsx";
import Users from "./pages/Users.tsx";
import Timesheet from "./pages/employee/Timesheet.tsx";
import Logout from "./components/auth/Logout.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Login />} />
			<Route path="/logout" element={<Logout/>}/>
			<Route path="/admin" element={<Dashboard />} />
			<Route path="/departments" element={<Departments />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/employees" element={<Users />} />
			<Route path="/timesheets" element={<Timesheet />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
