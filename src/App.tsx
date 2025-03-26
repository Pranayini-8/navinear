import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";

function MyCustomComponent() {
  const { mapData } = useMap();

  return mapData.getByType("space").map((space) => {
    return <Label target={space.center} text={space.name} />;
  });
}

export default function App() {
  // See Demo API key Terms and Conditions
  // https://developer.mappedin.com/v6/demo-keys-and-maps/
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

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Maps from "./pages/Maps";
// import OfficeHours from "./pages/OfficeHours";
// import Navibar from "./components/Navibar"; //the navigation bar
// // add the header and footer files

// function App() {
//   return (
//     <Router>
//       <Navibar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/maps" element={<Maps />} />
//         <Route path="/officehours" element={<OfficeHours />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
