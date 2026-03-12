import { WEATHER_ID } from "@/constants/weatherIds";

export interface WeatherTheme {
  gradient: string;
  textColor: string;
}

const isNight = (sunrise: number, sunset: number): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return now < sunrise || now > sunset;
};

const inRange = (id: number, min: number, max: number) => id >= min && id < max;

export const getWeatherTheme = (
  weatherId: number,
  sunrise: number,
  sunset: number,
): WeatherTheme => {
  if (isNight(sunrise, sunset)) {
    return {
      gradient: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      textColor: "#ffffff",
    };
  }

  if (
    inRange(weatherId, WEATHER_ID.THUNDERSTORM.min, WEATHER_ID.THUNDERSTORM.max)
  ) {
    return {
      gradient: "linear-gradient(135deg, #1a1a2e, #16213e, #4a4a8a)",
      textColor: "#ffffff",
    };
  }

  if (inRange(weatherId, WEATHER_ID.RAIN.min, WEATHER_ID.RAIN.max)) {
    return {
      gradient: "linear-gradient(135deg, #2c3e50, #3498db, #5dade2)",
      textColor: "#ffffff",
    };
  }

  if (inRange(weatherId, WEATHER_ID.SNOW.min, WEATHER_ID.SNOW.max)) {
    return {
      gradient: "linear-gradient(135deg, #e8eaf6, #c5cae9, #b0bec5)",
      textColor: "#1a237e",
    };
  }

  if (
    inRange(weatherId, WEATHER_ID.ATMOSPHERE.min, WEATHER_ID.ATMOSPHERE.max)
  ) {
    return {
      gradient: "linear-gradient(135deg, #757f9a, #d7dde8)",
      textColor: "#1c1c2e",
    };
  }

  if (weatherId === WEATHER_ID.CLEAR) {
    return {
      gradient: "linear-gradient(135deg, #2980b9, #6dd5fa, #ffffff)",
      textColor: "#1a237e",
    };
  }

  if (
    inRange(weatherId, WEATHER_ID.FEW_CLOUDS.min, WEATHER_ID.FEW_CLOUDS.max)
  ) {
    return {
      gradient: "linear-gradient(135deg, #4b6cb7, #89a4c7, #c9d6df)",
      textColor: "#ffffff",
    };
  }

  if (inRange(weatherId, WEATHER_ID.OVERCAST.min, WEATHER_ID.OVERCAST.max)) {
    return {
      gradient: "linear-gradient(135deg, #606c88, #3f4c6b)",
      textColor: "#ffffff",
    };
  }

  return {
    gradient: "linear-gradient(135deg, #2980b9, #6dd5fa)",
    textColor: "#ffffff",
  };
};
