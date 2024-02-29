import Compass from "./subcomponents/Compass";
import { ComponentHeader } from "../ComponentHeader";
import Wind from "@/public/icons/wind.png";

const WindComponent = ({ speed, deg }: { speed: number; deg: number }) => {
  return (
    <div
      className="component-container"
      style={{ height: "170px", width: "50%" }}>
      <ComponentHeader title="Wind" icon={Wind} />
      <div style={{ height: "10px" }} />
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Compass deg={deg} speed={speed} />
      </div>
    </div>
  );
};

export default WindComponent;
