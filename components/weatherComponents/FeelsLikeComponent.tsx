import { ComponentHeader } from "../ComponentHeader";
import { getHourMinutes } from "@/utils/gettimedata";
import Water from "@/public/icons/water.png";
import Image from "next/image";

const FeelsLike = ({
  temperature,
  feltTemperature,
}: {
  temperature: number;
  feltTemperature: number;
}) => {
  const status = () => {
    if (feltTemperature < temperature) {
      return "Feels colder than actual temperature";
    } else if (feltTemperature > temperature) {
      return "Feels warmer than actual temperature";
    } else {
      return "Feels like actual temperature";
    }
  };
  return (
    <div className="component-container" style={{ height: "170px" }}>
      <ComponentHeader title="Feels like" icon={Water} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "2rem" }}>{feltTemperature}°</span>
          <span>{status()}</span>
        </div>
      </div>
    </div>
  );
};

export default FeelsLike;
