import RainCloud from "@/public/icons/rain-cloud.png";
import Clouds from "@/public/icons/clouds.png";
import PartlyCloudyDay from "@/public/icons/partly-cloudy-day.png";
import Sun from "@/public/icons/sun.png";
import Rain from "@/public/icons/rain.png";
import Sunrise from "@/public/icons/sunrise.png";
import Sunset from "@/public/icons/sunset.png";
import Fog from "@/public/icons/fog.png";
import Storm from "@/public/icons/storm.png";
import StormyWeather from "@/public/icons/stormy-weather.png";
import Snow from "@/public/icons/snow.png";

export const weatherIcon = (code: number) => {
  switch (code) {
    case 0:
    case 1:
      return Sun;
    case 2:
      return PartlyCloudyDay;
    case 3:
      return Clouds;
    case 45:
    case 48:
      return Fog;
    case 51:
    case 53:
    case 54:
      return RainCloud;
    case 55:
      return Rain;
    case 61:
    case 63:
    case 65:
      return Rain;
    case 71:
    case 73:
    case 75:
    case 77:
      return Snow;
    case 80:
    case 81:
    case 82:
      return Rain;
    case 95:
      return StormyWeather;
    case 96:
    case 99:
      return Storm;
  }
};
export function getWeatherDescription(code: number) {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
      "Mainly clear sky";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Depositing rime fog";
    case 51:
      return "Light drizzle";
    case 53:
    case 54:
      return "Moderate drizzle";
    case 55:
      return "Dense drizzle";
    case 56:
      return "Light freezing drizzle";
    case 57:
      return "Dense freezing drizzle";
    case 61:
      return "Light rain";
    case 63:
      return "Moderate rain";
    case 65:
      return "Heavy rain";
    case 66:
      return "Light freezing rain";
    case 67:
      return "Heavy freezing rain";
    case 71:
      return "Light snow fall";
    case 73:
      return "Moderate snow fall";
    case 75:
      return "Heavy snow fall";
    case 77:
      return "Snow grains";
    case 80:
      return "Light rain showers";
    case 81:
      return "Moderate rain showers";
    case 82:
      return "Heavy rain showers";
    case 85:
      return "Light snow showers";
    case 86:
      return "Heavy snow showers";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case 96:
      return "Thunderstorm with light rain";
    case 99:
      "Thunderstorm with heavy rain";
    default:
      return "Unknown weather code";
  }
}
