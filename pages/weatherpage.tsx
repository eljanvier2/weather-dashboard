import React from "react";
import TemperatureComponent from "@/components/temperaturecomponent";
import WeeklyForecast from "@/components/weeklyforecast";
import OtherCities from "@/components/othercities";
import UvIndex from "@/components/uvindex";
import NewsComponent from "@/components/newscomponent";
import { HourlyForecast } from "@/components/hourlyforecast";
import MapComponent from "@/components/mapcomponent";
import { NasaPicture, News } from "@/type";
import Image from "next/image";
import { NasaPictureComponent } from "@/components/nasapicturecomponent";
import SunComponent from "@/components/suncomponent";
import WindComponent from "@/components/windcomponent";
import AirQualityComponent from "@/components/airqualitycomponent";
import GithubButton from "@/components/githubutton";
import HumidityComponent from "@/components/humiditycomponent";

require("dotenv").config();

interface WeatherPageProps {
  weatherData: any;
  news: News;
  picture: NasaPicture;
}

const WeatherPage = ({ weatherData, news, picture }: WeatherPageProps) => {
  return (
    <div
      className={
        weatherData.current.is_day === 1
          ? "weatherbody-day"
          : "weatherbody-night"
      }>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "1vw",
          paddingTop: "1vh",
          paddingBottom: "1vh",
        }}>
        <GithubButton />
      </div>
      <div className="weather-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
          <TemperatureComponent
            data={weatherData.current}
            dailyExtremes={{
              max: weatherData.daily.temperature_2m_max[0],
              min: weatherData.daily.temperature_2m_min[0],
            }}
            city={weatherData.city}
            timezone={weatherData.timezone}
          />
          <WeeklyForecast data={weatherData.daily} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
            width: "20vw",
          }}>
          <UvIndex uv={weatherData.daily.uv_index_max[0]} />
          <HourlyForecast data={weatherData.hourly} />
          <AirQualityComponent airQuality={parseInt(weatherData.airquality)} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "35vw",
            gap: "1vh",
          }}>
          <NewsComponent news={news} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "50%",
            }}>
            <MapComponent
              lat={weatherData.latitude}
              lon={weatherData.longitude}
            />
          </div>
          <div style={{ display: "flex", gap: "1vw" }}>
            <SunComponent
              sunrise={weatherData.daily.sunrise[0]}
              sunset={weatherData.daily.sunset[0]}
            />
            <WindComponent
              speed={weatherData.current.wind_speed_10m}
              deg={weatherData.current.wind_direction_10m}
            />
            <HumidityComponent humidity={weatherData.current.relative_humidity_2m} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1vh",
          }}>
          <NasaPictureComponent picture={picture} />
          <OtherCities />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: {
  query: { lat: any; lon: any; city: any; timezone: any; country: any };
}) {
  const { lat, lon, city, timezone, country } = context.query;
  const [weatherres, airqualitres, newsres, nasares] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        lat ?? 44.84044
      }&longitude=${
        lon ?? -0.5805
      }&current=relative_humidity_2m,temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${
        timezone ?? "Europe%2FLondon"
      }`
    ),
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=european_aqi&forecast_days=1`
    ),
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${country ?? "fr"}&apiKey=${
        process.env.NEWS_API_KEY
      }`
    ),
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=1`
    ),
  ]);
  const weatherData = await weatherres.json();
  const airqualityData = await airqualitres.json();
  const newsData = await newsres.json();
  const articles = newsData.articles;
  const news = articles[Math.floor(Math.random() * articles.length)];
  const picturejson = await nasares.json();
  const picture = {
    date: picturejson[0].date,
    title: picturejson[0].title,
    url: picturejson[0].url,
    copyright: picturejson[0].copyright ?? "NASA",
  };
  if (airqualityData) {
    weatherData.airquality = airqualityData.hourly.european_aqi[0];
  } else {
    weatherData.airquality = 0;
  }
  if (city) {
    weatherData.city = city;
  } else {
    weatherData.city = "Bordeaux";
  }
  console.log(weatherData.airquality);
  return { props: { weatherData, news, picture } };
}

export default WeatherPage;
