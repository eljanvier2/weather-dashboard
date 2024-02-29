import Sun from "@/public/icons/sun.png";
import Image from "next/image";
import { ComponentHeader } from "./componentheader";
import MulticolorScale from "./multicolorscale";

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
      return "If you burn easily, use SPF 30+ sunscreen.";
    } else if (index < 8) {
      return "Stay in shade when the sun is strongest.";
    } else if (index < 11) {
      return "Protection required - UV damages skin and can cause sunburn";
    } else {
      return "Extra protection required - Unprotected skin can burn in minutes";
    }
  };

  return (
    <div
      className="component-container"
      style={{ height: "180px", }}>
      <ComponentHeader title="Max UV Index" icon={Sun} />
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}>
        <span style={{ fontSize: "2rem" }}>{uvIndex.toPrecision(1)}</span>
        <span > ({uvDescription(uvIndex)})</span>
      </div>
      <MulticolorScale
        percentage={uvPercentage}
        gradient="linear-gradient(to right, rgba(0, 128, 0, 1), rgba(255, 255, 0, 1), rgba(255, 165, 0, 1), rgba(255, 0, 0, 1), rgba(128, 0, 128, 1))"
      />
      <div style={{ paddingTop: "10px", width: "262px" }}>
        {protection(uvIndex)}
      </div>
    </div>
  );
};

export default UvIndex;
