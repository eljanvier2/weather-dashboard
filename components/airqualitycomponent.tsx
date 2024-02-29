import { ComponentHeader } from "./componentheader";
import Virus from "../public/icons/virus.png";
import MulticolorScale from "./multicolorscale";

const AirQualityComponent = ({ airQuality }: { airQuality: number }) => {
  const airQualityDescription = (index: number) => {
    if (index < 20) {
      return "Good";
    } else if (index < 40) {
      return "Fair";
    } else if (index < 60) {
      return "Moderate";
    } else if (index < 80) {
      return "Poor";
    } else if (index < 100) {
      return "Very Poor";
    } else {
      return "Hazardous";
    }
  };

  const warnings = (index: number) => {
    if (index < 20) {
      return "Air quality is good, and air pollution poses little or no risk.";
    } else if (index < 40) {
      return "Air quality is acceptable. Moderate health concern for very sensitive people.";
    } else if (index < 60) {
      return "Members of sensitive groups may experience health effects.";
    } else if (index < 80) {
      return "Everyone may begin to experience health effects.";
    } else if (index < 100) {
      return "Health alert: everyone may experience more serious health effects.";
    } else {
      return "Health warnings of emergency conditions.";
    }
  };

  return (
    <div className="component-container">
      <ComponentHeader title="Air Quality" icon={Virus} />
      <span style={{ fontSize: "2rem" }}>
        {airQualityDescription(airQuality)}
      </span>
      <span> ({airQuality})</span>
      <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
        <MulticolorScale
          percentage={airQuality}
          gradient="linear-gradient(to right, rgba(0, 0, 255, 1), rgba(0, 128, 0, 1), rgba(255, 255, 0, 1), rgba(255, 165, 0, 1), rgba(255, 0, 0, 1), rgba(128, 0, 128, 1))"
        />
      </div>
      <span>{warnings(airQuality)}</span>
    </div>
  );
};

export default AirQualityComponent;
