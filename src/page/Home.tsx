import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import WeatherCard from "@/components/weather-card/weather-card";
import { ModeToggle } from "@/components/mode-toggle";

import getCity from "@/utils/getCity";
import getWeather from "@/utils/getWeather";
import { Weather, List } from "@/interfaces/weather.interface";
import getFirstDataOfEachDay from "@/utils/returnFiveDays";

export default function Component() {
  const [searched, setSearched] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<List[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCity(city);
    setSearched(true);
    setLoading(true);
    const requestCities = await getCity(city);
    if (requestCities[0]) {
      const { lat, long } = requestCities[0];
      const weather = await getWeather<Weather>({
        lat: Number(lat),
        lon: Number(long),
      });

      setWeatherData(getFirstDataOfEachDay(weather));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-4 z-10">
        <ModeToggle />
      </div>
      <div
        className={`z-0 overflow-y-auto flex-grow flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          searched ? "lg:-translate-y-1/3" : "lg:translate-y-0"
        }`}
      >
        <div className="w-full max-w-md px-4">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ingrese una ciudad"
                className="flex-grow"
                required
              />
              <Button type="submit">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            <Skeleton className="h-[200px] w-[216px] rounded-xl" />
            <Skeleton className="h-[200px] w-[216px] rounded-xl" />
            <Skeleton className="h-[200px] w-[216px] rounded-xl" />
            <Skeleton className="h-[200px] w-[216px] rounded-xl" />
            <Skeleton className="h-[200px] w-[216px] rounded-xl" />
          </div>
        )}

        {!loading && weatherData && (
          <div className="w-full max-w-6xl overflow-y-auto my-8 px-4">
            <h1 className="text-xl text-left my-2">
              Proximos 5 días en {city}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {weatherData.map((day, index) => (
                <WeatherCard key={index} day={day} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
