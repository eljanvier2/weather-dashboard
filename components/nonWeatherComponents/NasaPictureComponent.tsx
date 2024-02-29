import Image from "next/image";
import { ComponentHeader } from "../ComponentHeader";
import Planet from "@/public/icons/planet.png";
import { NasaPicture } from "@/type";
import YouTube from "react-youtube";

const NasaPictureComponent = ({ picture }: { picture: NasaPicture }) => {
  return (
    <div
      className="component-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "375px",
      }}>
      <div style={{ alignSelf: "flex-start" }}>
        <ComponentHeader title="NASA Picture of the Day" icon={Planet} />
      </div>
      {!picture.url.includes("youtube") && (
        <div
          style={{
            maxHeight: "375px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}>
          <Image
            src={picture.url}
            alt="NASA picture of the day"
            width={300}
            height={300}
            style={{
              borderRadius: "10px",
              maxHeight: "250px",
              alignSelf: "center",
            }}
          />

          <div
            style={{
              paddingTop: "10px",
              paddingLeft: "9px",
              color: "rgba(255,255,255,0.8)",
            }}>{`${picture.title} - ${picture.copyright}`}</div>
        </div>
      )}
      {picture.url.includes("youtube") && (
        <YouTube
          style={{ borderRadius: "10px", maxHeight: "250px" }}
          videoId={picture.url.split("embed/")[1]}
        />
      )}
    </div>
  );
};

export default NasaPictureComponent;
