<div align="center">
<img src="https://github.com/jowy99/weather-app/blob/main/public/weather-app-banner.png" alt="weathr Banner" width="80%"/>
<p>
<h3><b>A beautifully weather app</b></h3>
</p>
</div>

## 📦 Packages:

- ⚡️ [Vitejs](https://vitejs.dev/) - Next generation frontend tooling.
- ☁️ [Vitejs PWA](https://vite-plugin-pwa.netlify.app/) - Zero-config PWA Framework-agnostic Plugin for Vite.
- ⚒️ [React 18](https://reactjs.org/) - A JavaScript library for building user interfaces.
- 💅 [Tailwind CSS](https://tailwindcss.com/) - CSS framework.

## ⚒️ Getting Started:

You will need:

- [Nodejs 16+](https://nodejs.org/).
- [Git](https://git-scm.com/).

1. Clone the repository:

```
git clone git@github.com:jowy99/weather-app.git
```

2. Create a .env file with the following variables:

```
VITE_RAPIDAPI_KEY=
VITE_RAPIDAPI_HOST=
```

🤔 How to generate the RAPIDAPI_KEY?

- Create a free RapidApi account: [midu.link/rapidapi](https://midu.link/rapidapi).
- Go to WeatherApi.com: [rapidapi.com/weatherapi/api/weatherapi-com/](https://rapidapi.com/weatherapi/api/weatherapi-com/).
- Click on "Pricing" -> "Basic" -> "Subscribe": [/weatherapi-com/pricing](https://rapidapi.com/weatherapi/api/weatherapi-com/pricing).
- Go to your RapidApi Dashboard: [/developer/dashboard](https://rapidapi.com/developer/dashboard).
- In the left sidebar -> "Default Apps" -> Click on your api -> "Security" and copy the generated Key in the .env file.

🔨 [All RapidApi and fetcher configuration here](https://github.com/pheralb/weathr/tree/main/src/services).

3. Install dependencies:

```
npm install
```

4. Run the app:

```
npm run dev
```

5. 🥳 Ready! Open the browser and write localhost:5173.

## 🚀 Deploy on Cloudflare Pages:

- [weather.joelarnaud.com](https://weather.joelarnaud.com/)

## 🔑 License:

- [MIT License](https://github.com/jowy99/weather-app/blob/main/LICENSE)