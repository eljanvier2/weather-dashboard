import Compass from "./compass";
import { ComponentHeader } from "./componentheader";
import Wind from "../public/icons/wind.png";

const WindComponent = ({ speed, deg }: { speed: number; deg: number }) => {
  return (
    <div className="component-container" style={{ height: "170px" }}>
      <ComponentHeader title="Wind" icon={Wind} />
      <div style={{ height: "10px" }} />
      <Compass deg={deg} speed={speed} />
    </div>
  );
};

export default WindComponent;
