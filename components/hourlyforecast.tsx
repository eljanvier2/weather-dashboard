import { HourlyWeather } from "@/interfaces/datainterfaces";
import { getHourMinutes } from "@/utils/gettimedata";
import { weatherIcon } from "@/utils/iconparsing";
import Image from "next/image";

interface HourlyForecastProps {
  data: HourlyWeather;
}

export const HourlyForecast = ({ data }: HourlyForecastProps) => {
  var x = 0;
  return (
    <div
      className="component-container"
      style={{ display: "flex", gap: "2vw" }}>
      {data.time.map((hour, index) => {
        const currentHour = new Date().getHours();
        const hourToCompare = parseInt(hour.split("T")[1].split(":")[0]);
        if (hourToCompare >= currentHour && x < 5) {
          x++;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3vh",
              }}>
              <span>{x === 1 ? "Now" : hourToCompare}</span>
              <Image
                src={weatherIcon(data.weather_code[index]) ?? ""}
                alt="Weather Icon"
                width={48}
              />
              <span>{data.temperature_2m[index]}º</span>
            </div>
          );
        }
      })}
    </div>
  );
};