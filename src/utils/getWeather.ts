import axios, { AxiosError } from "axios";
const { VITE_API_URL_WEATHER, VITE_API_KEY_WEATHER } = import.meta.env;
import { Weather } from "../interfaces/weather.interface";

interface WeatherParams {
  lat?: number;
  lon: number;
}

const getWeather = async <T,>(weatherParams: WeatherParams, prevParams?: WeatherParams): Promise<T | Weather> => {
  if (
    prevParams &&
    prevParams.lat === weatherParams.lat &&
    prevParams.lon === weatherParams.lon
  ) {
    return prevParams as T;
  }

  try {
    const url = new URL(`${VITE_API_URL_WEATHER}`);

    url.searchParams.append("lat", String(weatherParams.lat));
    url.searchParams.append("lon", String(weatherParams.lon));
    url.searchParams.append("lang", "sp");
    url.searchParams.append("appid", VITE_API_KEY_WEATHER || "");

    const response = await axios.get<T>(url.toString());
    return response.data;
  } catch (err) {
    console.error("Error fetching weather data:", (err as AxiosError).message);
    return  {} as T;
  }
};

export default getWeather;