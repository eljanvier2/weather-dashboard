import { ComponentHeader } from "./componentheader";
import Sun from "../public/icons/fog.png";
import { getHourMinutes } from "@/utils/gettimedata";
import Sunrise from "../public/icons/sunrise.png";
import Sunset from "../public/icons/sunset.png";
import Image from "next/image";

const SunComponent = ({
  sunrise,
  sunset,
}: {
  sunrise: string;
  sunset: string;
}) => {
  return (
    <div className="component-container" style={{ height: "18vh" }}>
      <ComponentHeader title="Sunrise & Sunset" icon={Sun} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5vw",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {getHourMinutes(sunrise)}
            <Image src={Sunrise} alt="Sunrise" width={50} />
            <span style={{ fontSize: "1.2rem", fontWeight: "lighter" }}>
              Sunrise
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {getHourMinutes(sunset)}
            <Image src={Sunset} alt="Sunset" width={50} />
            <span style={{ fontSize: "1.2rem", fontWeight: "lighter" }}>
              Sunset
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunComponent;
