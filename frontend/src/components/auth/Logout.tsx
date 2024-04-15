import Cookies from "js-cookie";

const Logout = () => {
	
	Cookies.remove("refreshToken");
	localStorage.clear();


	window.location.href = "/";
};

export default Logout;
