const transformKelvinToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(0);
}

export default transformKelvinToCelsius;