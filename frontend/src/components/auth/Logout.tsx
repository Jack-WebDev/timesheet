import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const clearCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/api/users/logout"); // Assuming the API endpoint is correct
        clearCookie("jwt");
        clearCookie("refreshToken");
        localStorage.clear();
        navigate("/"); // Redirect to the homepage after logout
      } catch (error) {
        console.error("Error logging out. Please try again.", error);
        // Handle error: Display a message or perform other actions as needed
      }
    };

    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run this effect only once when the component mounts

  // You need to return something from the component function
  return null; // or you can return a loading spinner, message, etc.
};

export default Logout;
