import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const UserFlowCard = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleCardClick = () => {
    navigate("/home/userflowchart"); // Navigate to the desired route
  };

  return (
    <div
      onClick={handleCardClick} // Add onClick handler
      className="max-w-sm border border-gray-200 rounded-lg overflow-hidden shadow-md bg-blue-100 hover:bg-blue-200 transition-all duration-200 ease-in-out cursor-pointer"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">User Flow Chart</div>
        <p className="text-gray-700 text-base">
          This is a simple card component using Tailwind CSS in a React.js app.
          You can customize it further.
        </p>
      </div>
    </div>
  );
};

export default UserFlowCard;
