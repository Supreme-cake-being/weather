interface WeatherTheme {
  gradient: string;
  textColor: string;
}

const isNight = (sunrise: number, sunset: number): boolean => {
  const now = Math.floor(Date.now() / 1000);
  return now < sunrise || now > sunset;
};

export const getWeatherTheme = (
  weatherId: number,
  sunrise: number,
  sunset: number,
): WeatherTheme => {
  const night = isNight(sunrise, sunset);

  // Ніч — завжди темно-синій незалежно від погоди
  if (night) {
    return {
      gradient: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      textColor: "#ffffff",
    };
  }

  // Гроза
  if (weatherId >= 200 && weatherId < 300) {
    return {
      gradient: "linear-gradient(135deg, #1a1a2e, #16213e, #4a4a8a)",
      textColor: "#ffffff",
    };
  }

  // Дощ / морось
  if (weatherId >= 300 && weatherId < 600) {
    return {
      gradient: "linear-gradient(135deg, #2c3e50, #3498db, #5dade2)",
      textColor: "#ffffff",
    };
  }

  // Сніг
  if (weatherId >= 600 && weatherId < 700) {
    return {
      gradient: "linear-gradient(135deg, #e8eaf6, #c5cae9, #b0bec5)",
      textColor: "#1a237e",
    };
  }

  // Туман / мряка
  if (weatherId >= 700 && weatherId < 800) {
    return {
      gradient: "linear-gradient(135deg, #757f9a, #d7dde8)",
      textColor: "#1c1c2e",
    };
  }

  // Ясно
  if (weatherId === 800) {
    return {
      gradient: "linear-gradient(135deg, #2980b9, #6dd5fa, #ffffff)",
      textColor: "#1a237e",
    };
  }

  // Хмарно
  if (weatherId >= 801 && weatherId <= 802) {
    return {
      gradient: "linear-gradient(135deg, #4b6cb7, #89a4c7, #c9d6df)",
      textColor: "#ffffff",
    };
  }

  // Похмуро
  if (weatherId >= 803 && weatherId <= 804) {
    return {
      gradient: "linear-gradient(135deg, #606c88, #3f4c6b)",
      textColor: "#ffffff",
    };
  }

  // Fallback
  return {
    gradient: "linear-gradient(135deg, #2980b9, #6dd5fa)",
    textColor: "#ffffff",
  };
};
