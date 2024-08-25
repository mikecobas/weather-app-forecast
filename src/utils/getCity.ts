import axios, { AxiosError } from "axios";
import { Cities } from "../interfaces/cities.interface";

const getCity = async (city: string): Promise<Cities[]> => {
  let data: Cities[] | null = null;

  if (city === "") {
    return [];
  }

  try {
    const url = new URL(`${import.meta.env.VITE_API_URL_RESERVAMOS}?q=${city}`);

    const response = await axios.get<Cities[]>(url.toString());
    data = response.data;
  } catch (err) {
    console.error(err as AxiosError);
    data = [];
  } 

  return data;
};

export default getCity;
