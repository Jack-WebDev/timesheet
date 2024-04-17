
import Layout from "@/components/Layout";
import ProjectTable from "@/components/tableUI/ProjectTable";


const Projects = () => {

	return (
		<div className="relative">
			<Layout />
			<div>
				<ProjectTable/>
			</div>
		</div>
	);
};

export default Projects;
