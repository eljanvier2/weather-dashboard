// page.js
"use client";

import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
require("dotenv").config();

interface MapComponentProps {
  lat: number;
  lon: number;
}

const MapComponent = ({ lat, lon }: MapComponentProps) => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY || "";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/elliotjanvier/clsw02z34006x01o3dasxgsgu",
      center: [lon, lat],
      zoom: 11,
      maxZoom: 15,
      minZoom: 9,
      pitch: 45,
    });
  }, [lat, lon]);

  // Clean up on unmount
  // return () => map.remove();
  return (
    <div
      className="component-container"
      style={{
        width: "50%",
        height: "50%",
        padding: 0,
        alignSelf: "flex-end",
      }}>
      <div
        ref={mapContainerRef}
        style={{
          maxWidth: "100%",
          height: "100%",
          width: "100%",
          borderRadius: "10px",
        }}
        id="map"></div>
    </div>
  );
};

export default MapComponent;
