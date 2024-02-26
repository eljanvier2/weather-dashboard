import React from "react";
import TimeComponent from "@/components/timecomponent";
import { getDay, getHourMinutes } from "@/utils/gettimedata";
import Image from "next/image";
import { weatherIcon, getWeatherDescription } from "@/utils/iconparsing";
import { Coda } from "next/font/google";
import ArrowUp from "@/public/icons/arrow-up.png";
import ArrowDown from "@/public/icons/arrow-down.png";
import Link from "next/link";
import { CurrentWeather } from "@/type";

interface TemperatureComponentProps {
  data: CurrentWeather;
  dailyExtremes: {
    max: number;
    min: number;
  };
  city: string;
  timezone: string;
}

const TemperatureComponent: React.FC<TemperatureComponentProps> = ({
  data,
  dailyExtremes,
  city,
  timezone,
}) => {
  return (
    <div className="component-container" style={{ width: "18vw" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            <span>{getDay(data.time)}</span>
            <span>{city}</span>
          </div>
          <TimeComponent timezone={timezone} />
        </div>
        <span style={{ alignSelf: "center", fontSize: "10vh" }}>
          {data.temperature_2m}º
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "fit-content",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "fit-content",
            }}>
            <Image
              src={weatherIcon(data.weather_code) ?? ""}
              width={50}
              height={50}
              alt="Icone"
            />
            <span style={{ alignSelf: "start", fontSize: "1.5vh" }}>
              {getWeatherDescription(data.weather_code)}
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <Image src={ArrowUp} width={20} height={20} alt="Arrow up" />
            <span>{dailyExtremes.max}º</span>
            <Image src={ArrowDown} width={20} height={20} alt="Arrow down" />
            <span>{dailyExtremes.min}º</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureComponent;
