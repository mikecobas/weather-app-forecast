import { List, Weather } from "@/interfaces/weather.interface";

const getFirstDataOfEachDay = (data: Weather): List[] => {
  const dataList = data.list;
  const firstDataOfEachDay: { [key: string]: List } = {};

  dataList.forEach((item: List) => {
    const date = item.dt_txt.split(" ")[0];
    if (Object.keys(firstDataOfEachDay).length < 5 && !firstDataOfEachDay[date]) {
      firstDataOfEachDay[date] = item;
    }
  });

  console.log(Object.values(firstDataOfEachDay));

  return Object.values(firstDataOfEachDay);
};

export default getFirstDataOfEachDay;