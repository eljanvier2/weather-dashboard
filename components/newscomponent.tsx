import { News } from "@/interfaces/datainterfaces";
import { getDay } from "@/utils/gettimedata";
import NewsIcon from "@/public/icons/news-icon.png";
import Image from "next/image";
import { ComponentHeader } from "./componentheader";
import Link from "next/link";
import OpenLink from "@/public/icons/open-link.png";
import { useState } from "react";

interface NewsComponentProps {
  news: News;
}

const NewsComponent = ({ news }: NewsComponentProps) => {
  const [hover, setHover] = useState(false);

  const isToday = (someDate: string) => {
    const today = new Date();
    const date = new Date(someDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  return (
    <div
      className="component-container"
      style={{ width: "15vw", height: "fit-content" }}>
      <ComponentHeader title="Country News" icon={NewsIcon} />
      <div
        style={{
          fontSize: "1.2rem",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 4,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
        {news.title}
      </div>
      <Link legacyBehavior href={news.url}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ display: "flex", width: "fit-content" }}>
          <span style={{ textDecorationLine: hover ? "underline" : "" }}>
            {"View Article "}
          </span>
          <Image src={OpenLink} alt="Open Link" height={20} />
        </a>
      </Link>
      <div style={{ color: "lightgrey", fontWeight: "lighter" }}>
        {isToday(news.publishedAt) ? "Today" : getDay(news.publishedAt)} at{" "}
        {news.publishedAt.split("T")[1].split(":")[0]}:
        {news.publishedAt.split("T")[1].split(":")[1]}
      </div>
    </div>
  );
};

export default NewsComponent;