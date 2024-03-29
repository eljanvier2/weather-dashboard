import React from 'react'
import TemperatureComponent from '@/components/weatherComponents/TemperatureComponent'
import WeeklyForecast from '@/components/weatherComponents/WeeklyForecastComponent'
import UvIndex from '@/components/weatherComponents/UVIndexComponent'
import HourlyForecast from '@/components/weatherComponents/HourlyForecastComponent'
import MapComponent from '@/components/nonWeatherComponents/MapComponent'
import NasaPictureComponent from '@/components/nonWeatherComponents/NasaPictureComponent'
import SunComponent from '@/components/weatherComponents/SunComponent'
import WindComponent from '@/components/weatherComponents/WindComponent'
import AirQualityComponent from '@/components/weatherComponents/AirQualityComponent'
import NewsComponent from '@/components/nonWeatherComponents/NewsComponent'
import HumidityComponent from '@/components/weatherComponents/HumidityComponent'
import FeelsLike from '@/components/weatherComponents/FeelsLikeComponent'
import OtherCities from '@/components/OtherCities'
import { type News, type NasaPicture } from '@/type'

interface WeatherGridProps {
  weatherData: any
  news: News
  picture: NasaPicture
}

const WeatherGrid: React.FC<WeatherGridProps> = ({
  weatherData,
  news,
  picture
}: WeatherGridProps) => {
  return (
    <>
      <div className="weather-grid">
        <div className="temperature-component">
          <TemperatureComponent
            data={weatherData.current}
            dailyExtremes={{
              max: weatherData.daily.temperature_2m_max[0],
              min: weatherData.daily.temperature_2m_min[0]
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
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '18px'
          }}>
          <UvIndex uv={weatherData.daily.uv_index_max[0]} />
          <HourlyForecast data={weatherData.hourly} />
        </div>
        <div
          className="airquality-twilight-wind-component"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            gap: '18px'
          }}>
          <AirQualityComponent
            airQuality={parseInt(String(weatherData.airquality))}
          />
          <div
            className="twilight-wind-component"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              gap: '18px'
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              gap: '25px'
            }}>
            <NewsComponent news={news} />
            <div
              className="humidity-feelslike-component"
              style={{ display: 'flex', gap: '18px' }}>
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
    </>
  )
}

export default WeatherGrid
