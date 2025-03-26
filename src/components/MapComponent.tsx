// // import React, { useState } from "react";
// // import { MapView, useMapData } from "@mappedin/react-sdk";
// // import "@mappedin/react-sdk/lib/esm/index.css";

// // const MapComponent: React.FC = () => {
// //   const { isLoading, error, mapData } = useMapData({
// //     venue: {
// //       key: "YOUR_MAPPEDIN_API_KEY",
// //       secret: "YOUR_SECRET",
// //       mapId: "YOUR_MAP_ID",
// //     },
// //   });

// //   const [roomName, setRoomName] = useState<string>("");

// //   //Display the map
// //   const mapView =

// //   // Function to handle finding a room and navigating to it
// //   const handleFindRoom = async () => {
// //     if (!mapData) return;

// //     // Find the destination room
// //     const destination = mapData
// //       .getByType("space")
// //       .find((space) => space.name.toLowerCase() === roomName.toLowerCase());

// //     if (!destination) {
// //       alert("Room not found.");
// //       return;
// //     }

// //     const start = mapData
// //       .getByType("space")
// //       .find((space) => space.name === "Hall")!;

// //     // Get directions between the two spaces.
// //     const directions = mapData.getDirections(start, destination)!;

// //     // Draw the directions on the map.
// //     mapView.Navigation.draw(directions);
// //   };

// //   if (isLoading) return <div>Loading map...</div>;
// //   if (error) return <div>Error: {error.message}</div>;

// //   return (
// //     <div>
// //       {/* Room Search Input */}
// //       <div className="p-4">
// //         <input
// //           type="text"
// //           placeholder="Enter room name..."
// //           value={roomName}
// //           onChange={(e) => setRoomName(e.target.value)}
// //           className="p-2 border rounded-lg w-full"
// //         />
// //         <button
// //           onClick={handleFindRoom}
// //           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
// //         >
// //           Find Room
// //         </button>
// //       </div>

// //       {/* Map View */}
// //       {mapData && <MapView mapData={mapData} />}
// //     </div>
// //   );
// // };

// // export default MapComponent;

// import { getMapData, show3dMap } from "@mappedin/mappedin-js";
// import "@mappedin/mappedin-js/lib/index.css";

// async function init() {
//   // See Trial API key Terms and Conditions
//   // https://developer.mappedin.com/docs/demo-keys-and-maps
//   const mapData = await getMapData({
//     key: "mik_yeBk0Vf0nNJtpesfu560e07e5",
//     secret: "mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022",
//     mapId: "64ef49e662fd90fe020bee61",
//   });

//   //Display the default map in the mappedin-map div.
//   const mapView = await show3dMap(
//     document.getElementById("mappedin-map") as HTMLDivElement,
//     mapData
//   );

//   // Get a departure and arrival space.
//   const depart = mapData
//     .getByType("space")
//     .find((space) => space.name === "Focus 103 🎧")!;
//   const arrive = mapData
//     .getByType("space")
//     .find((space) => space.name === "Office 210 💼")!;

//   // Get directions between the two spaces.
//   const directions = mapData.getDirections(depart, arrive)!;

//   // Draw the directions on the map.
//   mapView.Navigation.draw(directions);
// }

// init();

import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";

function MyCustomComponent() {
  const { mapData } = useMap();

  return (
    <>
      {mapData.getByType("space").map((space) => {
        return <Label target={space.center} text={space.name} />;
      })}
    </>
  );
}

export default function App() {
  // See Demo API key Terms and Conditions
  // https://developer.mappedin.com/docs/demo-keys-and-maps
  const { isLoading, error, mapData } = useMapData({
    key: "mik_W8fMx1wWJyjevBMlt556607d1",
    secret: "mis_7jP7bMUYKfxM7BRujInCObPv5PvUwnHAk2NzNyIPJFF87fd1018",
    mapId: "67d6048435a08c000b263e28",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <MapView mapData={mapData}>
      <MyCustomComponent />
    </MapView>
  ) : null;
}
