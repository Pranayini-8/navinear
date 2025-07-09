// src/components/MapComponent.tsx
import { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { MapView, useMapData, useMap, Label } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import "./MapComponent.css";

// Type Definitions
interface OptionType {
  label: string;
  value: string;
}

interface NavigationAPI {
  draw: (directions: unknown) => void;
}

interface CustomMapView {
  Navigation: NavigationAPI;
}

// Component to draw labels on map for each space
function MyCustomComponent() {
  const { mapData } = useMap();

  return (
    <>
      {mapData?.getByType("space")?.map((space) => (
        <Label key={space.id} target={space.center} text={space.name} />
      ))}
    </>
  );
}

// Custom styling for React Select dropdowns
const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({ ...base, backgroundColor: "white", color: "black" }),
  menu: (base) => ({ ...base, backgroundColor: "white", color: "black" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#e2e8f0" : "white",
    color: "black",
  }),
  singleValue: (base) => ({ ...base, color: "black" }),
  input: (base) => ({ ...base, color: "black" }),
  placeholder: (base) => ({ ...base, color: "gray" }),
};

// Main Component
export default function MapComponent() {
  // Load map data using Mappedin API key
  const { isLoading, error, mapData } = useMapData({
    key: "ADD KEY HERE",
    secret: "ADD SECRET HERE",
    mapId: "ADD MAP ID",
  });

  // State variables
  const [mapView, setMapView] = useState<CustomMapView | null>(null);
  const [startLocation, setStartLocation] = useState<OptionType | null>(null);
  const [endLocation, setEndLocation] = useState<OptionType | null>(null);
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get all mappable spaces from map data
  const allSpaces = mapData?.getByType("space") ?? [];

  // Create dropdown options from all spaces
  const spaceOptions: OptionType[] = allSpaces
    .filter((space) => space.name?.trim())
    .map((space) => ({ label: space.name, value: space.name }));

  // Handle pathfinding between selected locations
  const handleFindPath = async () => {
    if (!mapData || !mapView || !startLocation || !endLocation) return;

    const start = allSpaces.find((s) => s.name === startLocation.value);
    const end = allSpaces.find((s) => s.name === endLocation.value);

    if (start && end) {
      try {
        const directions = await mapData.getDirections(start, end, {
          accessible: accessibilityEnabled,
        });

        if (directions) {
          mapView.Navigation.draw(directions);
        } else {
          console.warn("No directions found between the selected points.");
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    }
  };

  // Lock scrolling when fullscreen map is open
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "auto";
  }, [isFullscreen]);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // Render map and controls
  return mapData ? (
    <div className={`map-container ${isFullscreen ? "fullscreen-mode" : ""}`}>
      {/* Form UI only shows in non-fullscreen */}
      {!isFullscreen && (
        <div className="map-content-wrapper">
          <div className="form-controls">
            {/* Start location dropdown */}
            <Select
              options={spaceOptions}
              value={startLocation}
              onChange={(option) => setStartLocation(option)}
              placeholder="Select Start Location"
              isSearchable
              styles={customStyles}
              className="select-box"
            />
            {/* End location dropdown */}
            <Select
              options={spaceOptions}
              value={endLocation}
              onChange={(option) => setEndLocation(option)}
              placeholder="Select Destination"
              isSearchable
              styles={customStyles}
              className="select-box"
            />
            {/* Accessibility checkbox */}
            <label className="accessibility-checkbox">
              <input
                type="checkbox"
                checked={accessibilityEnabled}
                onChange={(e) => setAccessibilityEnabled(e.target.checked)}
              />
              <span className="checkmark"></span>
              Use accessible route
            </label>
            {/* Pathfinding button */}
            <button onClick={handleFindPath} className="find-path-button">
              Find Path
            </button>
          </div>
        </div>
      )}

      {/* ==========================
          Mappedin MapView Component
      =========================== */}
      <div
        className="map-view"
        onClick={() => setIsFullscreen(true)}
        style={{
          height: isFullscreen ? "100vh" : "70vh",
          width: isFullscreen ? "100vw" : "100%",
          position: isFullscreen ? "fixed" : "relative",
          top: isFullscreen ? 0 : undefined,
          left: isFullscreen ? 0 : undefined,
          zIndex: isFullscreen ? 9999 : undefined,
          borderRadius: isFullscreen ? 0 : "20px",
        }}
      >
        {/* Close fullscreen button */}
        {isFullscreen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="exit-fullscreen"
          >
            ✕
          </button>
        )}

        {/* Main MapView rendering the map */}
        <MapView
          mapData={mapData}
          style={{ height: "100%", width: "100%" }}
          onLoad={(instance) => setMapView(instance as CustomMapView)}
        >
          <MyCustomComponent />
        </MapView>
      </div>
    </div>
  ) : null;
}
