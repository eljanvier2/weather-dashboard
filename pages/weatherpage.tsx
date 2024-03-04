import React, { useState, useEffect } from 'react'
import { type City, type NasaPicture, type News } from '@/type'
import GithubButton from '@/components/GithubButton'
import SearchComponent from '@/components/SearchComponent'
import WeatherGrid from '@/components/WeatherGrid'

import dotenv from 'dotenv'
dotenv.config()

interface WeatherPageProps {
  weatherData: any
  news: News
  picture: NasaPicture
}

const WeatherPage: React.FC<WeatherPageProps> = ({
  weatherData,
  news,
  picture
}: WeatherPageProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<City[]>([])

  useEffect(() => {
    const fetchOptions = async (): Promise<void> => {
      if (inputValue.length > 0) {
        const res = await fetch(
          `/api/cityAutocomplete?inputValue=${inputValue}`
        )
        const response = await res.json()
        if (response.results.length === 0) {
          setOptions([])
          return
        }
        const options: City[] = response.results.map((result: any) => ({
          name: result.city,
          country: result.country,
          country_code: result.country_code,
          latitude: result.lat,
          longitude: result.lon,
          timezone: result.timezone.name.replace('/', '%2F')
        }))
        setOptions(options)
        return
      }
      setOptions([])
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchOptions()
  }, [inputValue])
  return (
    <div style={{ overflowX: 'hidden' }}>
      <title>{`${weatherData.city} - Weather`}</title>
      <div
        className={
          weatherData.current.is_day === 1
            ? 'weatherbody-day'
            : 'weatherbody-night'
        }>
        <div
          style={{
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '1vw',
            paddingTop: '1vh',
            paddingBottom: '1vh'
          }}>
          <div />
          <SearchComponent
            onChange={(e: string) => {
              setInputValue(e)
              if (e.length === 0) {
                setOptions([])
              }
            }}
            autocompleteOptions={options}
            resetOptionsArray={() => {
              setOptions([])
            }}
          />
          <GithubButton />
        </div>
        <WeatherGrid weatherData={weatherData} news={news} picture={picture} />
      </div>
    </div>
  )
}

export async function getServerSideProps (context: {
  query: {
    lat: any
    lon: any
    city: string
    timezone: string
    country: string
  }
}): Promise<{ props: any }> {
  const { lat, lon, city, timezone, country } = context.query

  const [weatherres, airqualitres, newsres, nasares] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        lat ?? 44.84044
      }&longitude=${
        lon ?? -0.5805
      }&current=relative_humidity_2m,temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${
        timezone ?? 'Europe%2FLondon'
      }`
    ),
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${
        lat ?? 44.84044
      }&longitude=${lon ?? -0.5805}&hourly=european_aqi&forecast_days=1`
    ),
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${country ?? 'fr'}&apiKey=${
        process.env.NEWS_API_KEY
      }`
    ),
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=1`
    )
  ])
  const weatherData = await weatherres.json()
  const airqualityData = await airqualitres.json()
  const newsData = await newsres.json()
  const articles = newsData.articles
  const news = articles[Math.floor(Math.random() * articles.length)]
  const picturejson = await nasares.json()
  const picture = {
    date: picturejson[0].date,
    title: picturejson[0].title,
    url: picturejson[0].url,
    copyright: picturejson[0].copyright ?? 'NASA'
  }
  if (airqualityData.length > 0) {
    weatherData.airquality = airqualityData.hourly.european_aqi[0]
  } else {
    weatherData.airquality = 0
  }
  if (city.length > 0) {
    weatherData.city = city
  } else {
    weatherData.city = 'Bordeaux'
  }
  return { props: { weatherData, news, picture } }
}

export default WeatherPage
