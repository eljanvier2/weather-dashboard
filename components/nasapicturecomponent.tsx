import Image from "next/image";
import { ComponentHeader } from "./componentheader";
import Planet from "../public/icons/planet.png";
import { NasaPicture } from "@/type";

export const NasaPictureComponent = ({ picture }: { picture: NasaPicture }) => {
  return (
    <div
      className="component-container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div style={{alignSelf:"flex-start"}}>
        <ComponentHeader title="NASA Picture of the Day" icon={Planet} />
      </div>
      <Image
        src={picture.url}
        alt="NASA picture of the day"
        width={300}
        height={300}
        style={{ borderRadius: "10px" }}
      />
      <div
        style={{
          paddingTop: "1vh",
          paddingLeft: "0.5vw",
          color: "rgba(255,255,255,0.8)",
        }}>{`${picture.title} - ${picture.copyright}`}</div>
    </div>
  );
};
