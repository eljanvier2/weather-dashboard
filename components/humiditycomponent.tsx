import { ComponentHeader } from "./componentheader";
import { getHourMinutes } from "@/utils/gettimedata";
import Water from "../public/icons/water.png";
import Image from "next/image";

const HumidityComponent = ({ humidity }: { humidity: number }) => {
  const status = (degre: number) => {
    if (degre < 30) {
      return "Low humidity, dry air";
    } else if (degre < 60) {
      return "Moderate humidity, comfortable";
    } else {
      return "High, humid air, muggy conditions";
    }
  };
  return (
    <div className="component-container" style={{ height: "18vh" }}>
      <ComponentHeader title="Humidity" icon={Water} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "2rem" }}>{humidity}°</span>
          <span>{status(humidity)}</span>
        </div>
      </div>
    </div>
  );
};

export default HumidityComponent;
