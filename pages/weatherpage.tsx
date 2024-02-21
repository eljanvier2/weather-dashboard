import React from "react";
import TemperatureComponent from "@/components/temperaturecomponent";
import WeeklyForecast from "@/components/weeklyforecast";
import OtherCities from "@/components/othercities";
import UvIndex from "@/components/uvindex";
import NewsComponent from "@/components/newscomponent";
import { HourlyForecast } from "@/components/hourlyforecast";
import MapComponent from "@/components/mapcomponent";

require("dotenv").config();

const WeatherPage = ({ weatherData, news }) => {
  return (
    <div
      className={
        weatherData.current.is_day === 1
          ? "weatherbody-day"
          : "weatherbody-night"
      }>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
          <UvIndex uv={weatherData.daily.uv_index_max[0]} />
          <HourlyForecast data={weatherData.hourly} />
          <NewsComponent news={news} />
        </div>
        <MapComponent lat={weatherData.latitude} lon={weatherData.longitude} />
        <OtherCities />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: {
  query: { lat: any; lon: any; city: any; timezone: any; country: any };
}) {
  const { lat, lon, city, timezone, country } = context.query;
  const [res1, res2] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        lat ?? 44.84044
      }&longitude=${
        lon ?? -0.5805
      }&current=temperature_2m,is_day,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${
        timezone ?? "Europe%2FLondon"
      }`
    ),
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`
    ),
  ]);
  const weatherData = await res1.json();
  const newsData = await res2.json();
  const articles = newsData.articles;
  const news = articles[Math.floor(Math.random() * articles.length)];
  if (city) {
    weatherData.city = city;
  } else {
    weatherData.city = "Bordeaux";
  }
  return { props: { weatherData, news } };
}

export default WeatherPage;
