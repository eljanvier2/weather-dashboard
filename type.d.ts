export interface City {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  country_code: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface News {
  source: object;
  author: string;
  title: string;
  description: string | undefined;
  url: string;
  urlToImage: string | undefined;
  publishedAt: string;
  content: string | null;
}

export interface NasaPicture {
  date: string;
  title: string;
  url: string;
  copyright: string;
}
