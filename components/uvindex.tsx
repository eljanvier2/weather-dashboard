import Sun from "@/public/icons/sun.png";
import Image from "next/image";
import { ComponentHeader } from "./componentheader";

interface UvIndexProps {
  uv: number;
}

const UvIndex = (data: UvIndexProps) => {
  const uvIndex = data.uv;
  const max = 11;
  const min = 0;
  const range = max - min;
  const uvPercentage = (uvIndex / range) * 100;

  const uvDescription = (index: number) => {
    if (index < 3) {
      return "Low";
    } else if (index < 6) {
      return "Moderate";
    } else if (index < 8) {
      return "High";
    } else if (index < 11) {
      return "Very High";
    } else {
      return "Extreme";
    }
  };

  const protection = (index: number) => {
    if (index < 3) {
      return "Minimal protection required";
    } else if (index < 6) {
      return "Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.";
    } else if (index < 8) {
      return "Take precautions, such as covering up, if you will be outside. Stay in shade near midday when the sun is strongest.";
    } else if (index < 11) {
      return "Protection required - UV damages skin and can cause sunburn";
    } else {
      return "Extra protection required - Unprotected skin can burn in minutes";
    }
  };

  return (
    <div
      className="component-container"
      style={{ height: "fit-content", width: "100%" }}>
      <ComponentHeader title="Max UV Index" icon={Sun} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "1vh",
          paddingBottom: "1vh",
        }}>
        <span style={{ fontSize: "2rem" }}>{uvIndex.toPrecision(1)}</span>
        <span>{uvDescription(uvIndex)}</span>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, rgba(255, 0, 0, 0.8),rgba(255, 127, 0, 0.8),rgba(255, 255, 0, 0.8),rgba(0, 255, 0, 0.8),rgba(0, 0, 255, 0.8),rgba(75, 0, 130, 0.8),rgba(143, 0, 255, 0.8) ",
          width: "100%",
          height: "1vh",
          borderRadius: "0.5vh",
        }}>
        <div
          style={{
            background: "white",
            marginLeft: `calc(${uvPercentage}% - 0.25vw)`,
            width: "0.4vw",
            height: "1vh",
            borderRadius: "0.4vh",
            border: "1px solid black",
          }}></div>
      </div>
      <div style={{ paddingTop: "1vh", width: "15vw" }}>
        {protection(uvIndex)}
      </div>
    </div>
  );
};

export default UvIndex;
