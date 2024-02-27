import { getDay } from "@/utils/gettimedata";
import Image from "next/image";
import { weatherIcon } from "@/utils/iconparsing";
import { DailyWeather } from "@/type";
import Calendar from "@/public/icons/calendar.png";
import { ComponentHeader } from "./componentheader";

interface WeeklyForecastProps {
  data: DailyWeather;
}

interface DayTemperaturesBarProps {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  index: number;
}

const DayTemperaturesBar: React.FC<DayTemperaturesBarProps> = ({
  temperature_2m_max,
  temperature_2m_min,
  index,
}) => {
  const max = Math.max(...temperature_2m_max);
  const min = Math.min(...temperature_2m_min);
  const range = max - min;
  const maxBar = temperature_2m_max[index] - min;
  const minBar = temperature_2m_min[index] - min;
  const maxPercentage = (maxBar / range) * 100;
  const minPercentage = (minBar / range) * 100;

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "100px",
        height: "8px",
        borderRadius: "4px",
      }}>
      <div
        style={{
          background: `linear-gradient(to right, #61affc ${minPercentage}%, #83f8ba ${maxPercentage}%)`,

          backgroundColor: "lightgray",
          width: `${maxPercentage - minPercentage}%`,
          height: "8px",
          borderRadius: "4px",
          marginLeft: `${minPercentage}%`,
        }}></div>
    </div>
  );
};

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {
  return (
    <div
      className="component-container"
      style={{ width: "100%", height: "100%" }}>
      <ComponentHeader title="Weekly Forecast" icon={Calendar} />
      <div style={{ paddingBottom: "18px" }}>
        {data.time.map((day, index) => {
          return (
            <div key={index} className="day">
              <span style={{ width: "70px" }}>
                {index === 0 ? "Today" : getDay(day)}
              </span>
              <Image
                src={weatherIcon(data.weather_code[index]) ?? ""}
                alt=""
                width={"25"}
                style={{
                  marginLeft: "18px",
                  marginRight: "18px",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              />
              <div className="weekly-temperatures">
                <span style={{  textAlign: "start" }}>
                  {data.temperature_2m_min[index]}
                </span>
                <DayTemperaturesBar
                  temperature_2m_max={data.temperature_2m_max}
                  temperature_2m_min={data.temperature_2m_min}
                  index={index}
                />
                <span style={{ width: "26", textAlign: "end" }}>
                  {data.temperature_2m_max[index]}
                </span>
              </div>
              {/* {index !== data.time.length - 1 && <hr />} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
