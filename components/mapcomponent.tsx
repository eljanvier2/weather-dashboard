// page.js
"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Layer, LayerProps, Source } from "react-map-gl";
require("dotenv").config();

interface MapComponentProps {
  lat: number;
  lon: number;
}

const MapComponent = ({ lat, lon }: MapComponentProps) => {
  return (
    <div
      className="component-container"
      style={{
        height: "375px",
        padding: 0,
        alignSelf: "flex-start",
      }}>
      <div
        style={{
          maxWidth: "100%",
          height: "100%",
          width: "100%",
          borderRadius: "10px",
        }}
        id="map">
        <ReactMapGL
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}
          mapStyle="mapbox://styles/mapbox/standard"
          latitude={lat}
          longitude={lon}
          zoom={11}
          style={{ borderRadius: "10px" }}
          maxZoom={15}
          minZoom={9}
          pitch={45}
        />
      </div>
    </div>
  );
};

export default MapComponent;
