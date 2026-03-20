# ⛅ Weather App

A responsive weather application built with Vue 3 and TypeScript, powered by the OpenWeatherMap API.

🌐 **[Live Demo](https://supreme-cake-being.github.io/weather/)**

---

## Features

### Core

- **City search with autocomplete** — debounced input with keyboard navigation (↑ ↓ Enter Esc) and full ARIA support
- **Current weather card** — temperature, description, feels like, humidity, wind, pressure, sunrise/sunset
- **Temperature chart** — next 24 hours forecast using ApexCharts with color-coded data points
- **Day / 5-day toggle** — switch between hourly chart and 5-day average forecast
- **Multiple weather blocks** — add up to 5 city blocks on the home tab, each fully independent
- **Block deletion** — confirmation modal before removing a block
- **Favorites tab** — save up to 5 cities; favorite blocks show day/week toggle without city search
- **Favorites limit modal** — informational modal when the 5-city limit is reached

### UX & Accessibility

- **IP geolocation** — auto-loads weather for the user's city on first visit via [ipapi.co](https://ipapi.co)
- **Persistent state** — blocks, favorites, active tab, language and theme are saved to `localStorage`
- **Error handling** — network errors, invalid API key, city not found — all show localized messages
- **Loading states** — spinner while weather data is being fetched
- **Dynamic card theme** — gradient and text color adapt to weather condition and time of day (day/night)

### Internationalization

- **EN / UK language switch** — full interface translation including dates, times, and API responses
- **Locale-aware formatting** — dates and times use the correct locale format
- **Persistent language** — saved to `localStorage`, with browser language auto-detection on first visit

### Theme

- **Light / Dark mode** — toggle in the header, respects system preference on first visit
- **Animated theme transition** — smooth color transition when switching themes
- **Persistent theme** — saved to `localStorage`

---

## Tech Stack

| Category    | Technology                                     |
| ----------- | ---------------------------------------------- |
| Framework   | Vue 3 + Composition API (`<script setup>`)     |
| Language    | TypeScript                                     |
| Build tool  | Vite                                           |
| HTTP client | Axios                                          |
| Charts      | ApexCharts                                     |
| CSS         | Pure CSS with CSS custom properties            |
| CSS reset   | modern-normalize                               |
| Linting     | ESLint + TypeScript ESLint + eslint-plugin-vue |
| Testing     | Vitest + @vue/test-utils + happy-dom           |
| CI/CD       | GitHub Actions                                 |
| Hosting     | GitHub Pages                                   |

---

## Project Structure

```
src/
├── api/
│   ├── client.ts          # Axios instances + error interceptors
│   ├── geo.ts             # City search (OpenWeatherMap Geocoding API)
│   ├── weather.ts         # Current weather + forecast
│   └── index.ts           # Re-exports
├── components/
│   ├── CitySearch.vue     # Autocomplete input with keyboard nav
│   ├── Container.vue      # Responsive layout wrapper
│   ├── Loader.vue         # Spinner with ARIA support
│   ├── Modal.vue          # Confirm / info modal via Teleport
│   ├── WeatherBlock.vue   # Main block: search + card + chart
│   ├── WeatherCard.vue    # Current weather display
│   └── WeatherChart.vue   # ApexCharts temperature chart
├── composables/
│   ├── useBlocks.ts       # Multi-block state + localStorage
│   ├── useChart.ts        # ApexCharts lifecycle management
│   ├── useDebounce.ts     # Debounce utility
│   ├── useFavorites.ts    # Favorites state + localStorage
│   ├── useGeolocation.ts  # IP-based city detection
│   ├── useI18n.ts         # Translation + language switching
│   ├── useTheme.ts        # Light/dark theme + localStorage
│   └── useWeather.ts      # Weather data fetching + error handling
├── constants/
│   ├── localeMap.ts       # Lang → locale mapping
│   ├── storageKeys.ts     # localStorage key constants
│   ├── tempColors.ts      # Temperature color thresholds
│   ├── translations.ts    # EN/UK translations
│   └── weatherIds.ts      # OpenWeatherMap condition ID ranges
├── types/
│   ├── chart.ts
│   ├── forecast.ts
│   ├── geo.ts
│   └── weather.ts
├── utils/
│   ├── forecastHelpers.ts # Forecast filtering and chart point mapping
│   ├── formatCity.ts      # City label formatting
│   ├── formatDate.ts      # Locale-aware date formatting
│   ├── formatTime.ts      # Locale-aware time formatting
│   └── weatherTheme.ts    # Gradient + text color by weather condition
└── views/
    ├── FavoritesView.vue  # Favorites tab
    └── HomeView.vue       # Home tab with multi-block logic
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- OpenWeatherMap API key ([free tier](https://openweathermap.org/api))

### Installation

```bash
# Clone the repository
git clone https://github.com/supreme-cake-being/weather.git
cd weather

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```dotenv
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
VITE_GEO_API_URL=https://api.openweathermap.org/geo/1.0
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run start
```

---

## Available Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Build for production           |
| `npm run start`         | Preview production build       |
| `npm run lint`          | Run ESLint                     |
| `npm run lint:fix`      | Run ESLint with auto-fix       |
| `npm run test`          | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

---

## Testing

The project has unit tests for all composables and key components.

```bash
# Run all tests
npm run test -- --run

# Generate coverage report
npm run test:coverage
```

### Coverage

| Category    | Files                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------- |
| Composables | `useBlocks`, `useDebounce`, `useFavorites`, `useGeolocation`, `useI18n`, `useTheme`, `useWeather` |
| Utils       | `forecastHelpers`, `formatCity`, `formatDate`, `formatTime`, `weatherTheme`                       |
| Components  | `CitySearch`, `Modal`, `WeatherBlock`                                                             |

---

## CI/CD

The project uses two GitHub Actions workflows:

### `deploy.yml` — runs on push to `main`

1. **Lint & Test** — ESLint + Vitest
2. **Build** — Vite build with injected secrets
3. **Deploy** — publishes `dist/` to GitHub Pages via `peaceiris/actions-gh-pages`

### `pr-check.yml` — runs on pull requests to `main`

1. **Lint** — ESLint
2. **Test** — Vitest with coverage artifact upload
3. **Build check** — verifies the build succeeds (runs only if lint and test pass)

---

## API

| Endpoint                    | Usage                                  |
| --------------------------- | -------------------------------------- |
| `GET /geo/1.0/direct`       | City autocomplete search               |
| `GET /data/2.5/weather`     | Current weather by coordinates         |
| `GET /data/2.5/forecast`    | 5-day / 3-hour forecast by coordinates |
| `GET https://ipapi.co/json` | IP-based geolocation (city detection)  |

---

## License

MIT
