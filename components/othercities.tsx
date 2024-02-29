import Link from "next/link";
import { useState } from "react";
import CityButton from "./citybutton";
import CityIcon from "@/public/icons/city-icon.png";
import Image from "next/image";
import { ComponentHeader } from "./componentheader";

const OtherCities = () => {
  const [hover, setHover] = useState(false);
  const cities = [
    {
      name: "Bordeaux",
      latitude: 44.84044,
      longitude: -0.5805,
      timezone: "Europe%2FParis",
      country: "France",
      country_code: "fr",
    },
    {
      name: "Paris",
      latitude: 48.866667,
      longitude: 2.333333,
      timezone: "Europe%2FParis",
      country: "France",
      country_code: "fr",
    },
    {
      name: "London",
      latitude: 51.509865,
      longitude: -0.118092,
      timezone: "Europe%2FLondon",
      country: "United Kingdom",
      country_code: "gb",
    },
    {
      name: "Montreal",
      latitude: 45.508888,
      longitude: -73.561668,
      timezone: "America%2FToronto",
      country: "Canada",
      country_code: "ca",
    },
    {
      name: "New York",
      latitude: 40.712776,
      longitude: -74.005974,
      timezone: "America%2FNew_York",
      country: "United States",
      country_code: "us",
    },
    {
      name: "Los Angeles",
      latitude: 34.052235,
      longitude: -118.243683,
      timezone: "America%2FLos_Angeles",
      country: "United States",
      country_code: "us",
    },
    {
      name: "Tokyo",
      latitude: 35.689487,
      longitude: 139.691711,
      timezone: "Asia%2FTokyo",
      country: "Japan",
      country_code: "jp",
    },
    {
      name: "Moscow",
      latitude: 55.755825,
      longitude: 37.617298,
      timezone: "Europe%2FMoscow",
      country: "Russia",
      country_code: "ru",
    },
  ];
  return (
    <div style={{  height: "fit-content", alignSelf: "end" }}>
      <ComponentHeader title="Other Cities" icon={CityIcon} />
      <div style={{ width: "100%", paddingTop: "10px" }}>
        {cities.map((city, index) => {
          return (
            <div key={index}>
              <CityButton city={city} />
              {index < cities.length - 1 ? (
                <div style={{ height: "7px" }}></div>
              ) : null}
            </div>
          );
        }, [])}
      </div>
    </div>
  );
};

export default OtherCities;
