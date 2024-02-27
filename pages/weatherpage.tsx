import React, { Suspense } from "react";
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
import FeelsLike from "@/components/feelslikecomponent";

require("dotenv").config();

interface WeatherPageProps {
  weatherData: any;
  news: News;
  picture: NasaPicture;
}

const WeatherPage = ({ weatherData, news, picture }: WeatherPageProps) => {
  return (
    <div>
      <title>{`${weatherData.city} - Weather`}</title>
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
          <div className="temperature-component">
            <TemperatureComponent
              data={weatherData.current}
              dailyExtremes={{
                max: weatherData.daily.temperature_2m_max[0],
                min: weatherData.daily.temperature_2m_min[0],
              }}
              city={weatherData.city}
              timezone={weatherData.timezone}
            />
          </div>
          <div className="weeklyforecast-component">
            <WeeklyForecast data={weatherData.daily} />
          </div>
          <div
            className="uvindex-hourlyforecast-component"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "18px",
            }}>
            <UvIndex uv={weatherData.daily.uv_index_max[0]} />
            <HourlyForecast data={weatherData.hourly} />
          </div>
          <div
            className="airquality-twilight-wind-component"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}>
            <AirQualityComponent
              airQuality={parseInt(weatherData.airquality)}
            />
            <div
              className="twilight-wind-component"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "18px",
              }}>
              <SunComponent
                sunrise={weatherData.daily.sunrise[0]}
                sunset={weatherData.daily.sunset[0]}
              />
              <WindComponent
                speed={weatherData.current.wind_speed_10m}
                deg={weatherData.current.wind_direction_10m}
              />
            </div>
          </div>
          <div className="news-humidity-feelslike-component">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: "18px",
              }}>
              <NewsComponent news={news} />
              <div
                className="humidity-feelslike-component"
                style={{ display: "flex", gap: "18px" }}>
                <HumidityComponent
                  humidity={weatherData.current.relative_humidity_2m}
                />
                <FeelsLike
                  temperature={weatherData.current.temperature_2m}
                  feltTemperature={weatherData.current.apparent_temperature}
                />
              </div>
            </div>
          </div>
          <div className="map-component">
            <MapComponent
              lat={weatherData.latitude}
              lon={weatherData.longitude}
            />
          </div>
          <div className="nasa-component">
            <NasaPictureComponent picture={picture} />
          </div>
          <div className="othercities-component">
            <OtherCities />
          </div>
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
      }&current=relative_humidity_2m,temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${
        timezone ?? "Europe%2FLondon"
      }`
    ),
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${
        lat ?? 44.84044
      }&longitude=${lon ?? -0.5805}&hourly=european_aqi&forecast_days=1`
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
  return { props: { weatherData, news, picture } };
}

export default WeatherPage;
