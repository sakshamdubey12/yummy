import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchWithMultiSelect from "../components/SearchWithMultiSelect";
import pan from "../images/pan.png";
import chef from "../images/Chef.gif"
import Chatbox from "../components/Chatbox";

const Generate = () => {
  const selectedOptions = useSelector((state) => state.search.selectedOptions);
  const [predictedRecipe, setPredictedRecipe] = useState(null); // State to store the predicted recipe
  const [loading, setLoading] = useState(false); // State for loader
  
  const handleGenerate = async () => {
    console.log("Selected Ingredients:", selectedOptions);

    const apiUrl = "http://localhost:3001/AI/generate"; // Replace with your API URL

    const data = {
      ingredients: selectedOptions,
    };
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("API Response:", result.predictedRecipe);

      // Update state with the predicted recipe
      setPredictedRecipe(result.predictedRecipe);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }finally {
      // Set loading to false after the API request is completed
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">

      {/* Main Content */}
      <div className="flex-grow px-8 py-0 h-full overflow-y-scroll">
        <div className="flex w-full">
          <div className="flex bg-white flex-col items-center w-full min-h-screen">
            <div className={`${predictedRecipe ||loading? 'mt-[-18%] w-[75%] text-center': 'justify-center w-[75%] text-center'}`}>

              <div className={`${predictedRecipe ||loading? 'relative h-[46%]': 'relative h-[65%]'}`}>
              {/* <div className='relative h-[65%]'> */}
                <img
                  src={pan} // Replace with the actual path to your image
                  alt="Pan with vegetables"
                  className={`${predictedRecipe ||loading? 'w-full scale-50 relative -top-9': 'w-full scale-75 relative -top-9'}`}
                  // className="w-full scale-50 relative -top-9"
                />
                <div className={`${predictedRecipe ||loading?'absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[100%] pb-2 font-bold text-5xl' : 'absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[100%] pb-2 font-bold text-6xl'}`}>
                  Generate Recipe!
                </div>
              </div>

              <div className={`${predictedRecipe ||loading? 'flex relative -mt-8 items-center': 'flex relative items-center'}`}>
              <SearchWithMultiSelect disabled={loading}/>
              <button
                className="bg-purple-700 absolute  text-white py-2 top-0 right-[15%] px-6 rounded-full"
                onClick={handleGenerate}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Generating..." : "Generate Now"} {/* Change text during loading */}
              </button>
              </div>
              <p className="text-lg text-purple-700 mt-4 mb-4">
                Here you can cook some amazing recipes!
              </p>
            

            {loading && (
              <div className="relative -top-24">
                {/* <div className="text-xl text-gray-600">
                  Loading...
                </div> */}
                <div className="loader mt-4"></div> {/* Optionally add a spinner */}
                  <img className="scale-50" src={chef} />
              </div>
            )}

            {/* Display the predicted recipe */}
            {predictedRecipe && !loading && (
              <>
                {/* <h2 className="text-2xl font-bold mb-2">Predicted Recipe:</h2> */}
                <div className="bg-purple-100 rounded-lg w-[50%] block m-auto">
                  <div className="bg-purple-700 p-4  font-semibold text-white rounded-t-lg">
                    <div className="flex justify-between">
                      <h1 className="text-xl">{predictedRecipe.RecipeName}</h1>
                      <p className="text-sm">{predictedRecipe.CuisineType}</p>
                    </div>
                    <p className="text-sm">{predictedRecipe.CookingTime}</p>
                  </div>
                  <div className="p-4">
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h1 className="text-md font-bold">
                          Preparation Intructions:
                        </h1>
                        <p className="text-sm">{predictedRecipe.ServingSize}</p>
                      </div>
                      <p>
                        {/* Split instructions into an array and map them to display on new lines */}
                        {predictedRecipe.Instructions.split(/\d+/)
                          .slice(1)
                          .map((instruction) => (
                            <ol key={instruction} className="list-disc">
                              <li>
                                {instruction.slice(1)}
                                <br />
                              </li>
                            </ol>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
      {/* Right Sidebar */}
      <div className="w-1/3 bg-white p-5 border-l h-full">
        <Chatbox />
        {/* <h3 className="text-gray-700 font-semibold mb-4">Top Places</h3>
        <ul className="space-y-3">
          <li className="text-gray-600">Bangkok, Thailand</li>
          <li className="text-gray-600">Marrakesh, Morocco</li>
          <li className="text-gray-600">Copenhagen, Denmark</li>
        </ul>

        <div className="mt-10">
          <h3 className="text-gray-700 font-semibold mb-4">Sponsor</h3>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h4 className="text-gray-800 font-semibold">InVision Studio</h4>
            <p className="text-gray-600 mt-1">
              The world's most powerful screen design tool.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-gray-700 font-semibold mb-4">Suggestions</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-600">
              <span>Matthew Kane</span>
              <button className="text-purple-700 hover:text-purple-800">
                Add
              </button>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Sarah Lee</span>
              <button className="text-purple-700 hover:text-purple-800">
                Add
              </button>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>James Cook</span>
              <button className="text-purple-700 hover:text-purple-800">
                Add
              </button>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Generate;
