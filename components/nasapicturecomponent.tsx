import Image from "next/image";
import { ComponentHeader } from "./componentheader";
import Planet from "../public/icons/planet.png";
import { NasaPicture } from "@/type";

export const NasaPictureComponent = ({
  picture,
}: {
  picture: NasaPicture;
}) => {
  return (
    <div className="component-container">
      <ComponentHeader title="NASA Picture of the Day" icon={Planet} />
      <Image
        src={picture.url}
        alt="NASA picture of the day"
        width={700}
        height={700}
        style={{ borderRadius: "10px" }}
      />
        <div style={{paddingTop:"1vh", paddingLeft:"0.5vw", color:"rgba(255,255,255,0.8)"}}>{`${picture.title} - ${picture.copyright}`}</div>
    </div>
  );
};
