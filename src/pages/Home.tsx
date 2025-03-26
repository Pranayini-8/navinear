// const Home = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen text-center text-blue-700">
//       <h1 className="text-4xl font-bold">
//         Welcome to UToledo Indoor Navigation
//       </h1>
//       <p className="text-lg mt-4">
//         Easily find your way around the North Engineering Building.
//       </p>
//     </div>
//   );
// };

// export default Home;

// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ToledoColors } from "../components/ColorScheme";

const Home: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h1
        className="text-4xl font-bold mb-6"
        style={{ color: ToledoColors.primary }}
      >
        University of Toledo Indoor Navigation
      </h1>
      <p className="mb-8 text-xl" style={{ color: ToledoColors.text }}>
        Easily navigate our campus buildings with our interactive map system
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          to="/maps"
          className="px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
          style={{
            backgroundColor: ToledoColors.secondary,
            color: ToledoColors.primary,
          }}
        >
          View Campus Maps
        </Link>
        <Link
          to="/office-hours"
          className="px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
          style={{
            backgroundColor: ToledoColors.primary,
            color: ToledoColors.secondary,
          }}
        >
          Check Office Hours
        </Link>
      </div>
    </div>
  );
};

export default Home;
