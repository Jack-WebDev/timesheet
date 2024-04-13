import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/admin/Login.tsx"
import Dashboard from './pages/admin/Dashboard.tsx';
import Departments from './pages/Departments.tsx';
import Projects from './pages/Projects.tsx';
import Users from './pages/Users.tsx';
import Timesheet from "./pages/employee/Timesheet.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route  path="/" element={<Login />} />
      <Route index={true} path="/admin" element={<Dashboard />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/employees" element={<Users />} />
      <Route path="/timesheets" element={<Timesheet />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
