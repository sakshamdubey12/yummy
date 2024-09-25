import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chatbox from "../components/Chatbox";

const Cuisines = () => {
  const { country } = useParams();
  const [op, setOp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/cuisines/country/${country}`
        );
        const data = await response.json();
        setOp(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };
    fetchCuisines();
  }, [country]);

  const handleCuisineClick = (cuisine, description) => {
    navigate(`/cuisine/${cuisine}`, { state: { description } });
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex-grow px-8 py-0 h-full overflow-y-scroll">
   
            <div className=" mx-auto w-full p-6 bg-white rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                {country} Cuisines
              </h1>
              <ul className="space-y-4">
                {op.map((item) => (
                  <li
                    key={item._id}
                    className="p-4 bg-gray-100 rounded-lg transition-shadow hover:shadow-md cursor-pointer"
                    // onClick={() =>
                    //   handleCuisineClick(item.cuisine, item.description)
                    // }
                  >
                    <h2 className="text-2xl font-semibold text-gray-700">
                      {item.cuisine}
                    </h2>
                    <p className="text-gray-500">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
        
      </div>
      {/* Right Sidebar */}
      <div className="w-1/3 bg-white p-5 border-l h-full">
        <Chatbox />
      </div>
    </div>
  );
};

export default Cuisines;
