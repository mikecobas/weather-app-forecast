import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Thermometer } from "lucide-react";
import { List } from "@/interfaces/weather.interface";
import transformKelvinToCelsius from "@/utils/transformTemperature";
import dayjs from "dayjs";
import "dayjs/locale/es";
const WeatherCard = ({ day }: { day: List }) => (
  <Card className="w-full">
    <CardContent>
      <div className="flex flex-row justify-end pt-6 gap-2">
        <p className="text-xs font-light text-right">
          {dayjs(day.dt_txt).format("DD / MM")}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {" "}
            {transformKelvinToCelsius(day.main.temp)} °C
          </p>
        </div>
        <div className="text-xl">
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt="weather-icon"
          />
        </div>
      </div>
      <div className="mb-2">
        <p className="text-md font-light">{day.weather[0].description}</p>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-sm md:text-2xl"></p>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="space-y-1 flex flex-col items-center">
          <Thermometer className="mx-auto h-4 w-4" />
          <p className="text-xs font-light">Max</p>
          <p className="text-sm font-bold">
            {transformKelvinToCelsius(day.main.temp_max)}°C
          </p>
        </div>
        <div className="space-y-1 flex flex-col items-center">
          <Thermometer className="mx-auto h-4 w-4" />
          <p className="text-xs font-light">Min</p>
          <p className="text-sm font-normal">
            {transformKelvinToCelsius(day.main.temp_min)}°C
          </p>
        </div>
        <div className="space-y-1 flex flex-col items-center">
          <Droplets className="mx-auto h-4 w-4" />
          <p className="text-xs font-light">Humedad</p>
          <p className="text-sm font-normal">{day.main.humidity}%</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default WeatherCard;
