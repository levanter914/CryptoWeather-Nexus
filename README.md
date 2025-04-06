```markdown
# 🌩️ CryptoWeather Nexus

**CryptoWeather Nexus** is a modern, multi-page dashboard built with Next.js App Router that fuses real-time **cryptocurrency trends** with **weather insights** — all wrapped in a responsive, clean UI.

Live data. Smooth navigation. Tailored for modern web.

---

## 🚀 Live Demo

🌍 [Visit the App](https://crypto-weather-nexus-green.vercel.app/)

---

## 🎥 Demo Video

> *(Insert Loom or YouTube walkthrough here)*  
Example: [Watch CryptoWeather Nexus in Action](https://loom.com/share/demo-link)

---

## ✨ Features

- 📈 **Real-time Crypto Prices** (via CoinCap v3 API with API Key auth)
- 🌦️ **Current Weather Data** by location (via OpenWeatherMap API)
- 🧭 **Multi-page Layout** with App Router
- ⚡️ Fully responsive with smooth transitions

---

## 🛠 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS + Custom Components
- **Crypto API**: CoinCap API v3 + CoinGecko
- **Weather API**: OpenWeatherMap API
- **UI Enhancements**: Neo-Brutalist CSS (used for components), ReCharts (used in CryptoTable), AliceCarousel (for trending slider)
- **Deployment**: Vercel

---

## ⚙️ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/cryptoweather-nexus.git
cd cryptoweather-nexus
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_api_key
NEXT_PUBLIC_COINCAP_API_KEY=your_api_key
```

4. **Run locally**

```bash
npm run dev
```

---

## 🎨 Design Decisions

- **App Router over Pages Router** for better layout management and server components.
- **AliceCarousel** for visually engaging crypto sliders.
- **Neo Brutalist CSS** for beautiful ui components.

---

## 🧠 Challenges & Solutions

| Challenge                              | Resolution                                                              |
|---------------------------------------|-------------------------------------------------------------------------|
| CoinCap v3 migration (from v2)        | Updated endpoints and added authentication via headers                 |
| Combining crypto + weather seamlessly | Created a unified layout using `layout.js` and shared components       |
| Mobile responsiveness                 | Used Tailwind’s responsive utilities and tested across devices         |

---

## 📂 Folder Structure

```
/src
    /app
    /api
        /coin
        /crypto
    /city-details
    /crypto-details
    /components
    /ReduxStore
    /public
```

---

## 📫 Contact

Feel free to connect or reach out!

- 💼 [LinkedIn](https://linkedin.com/in/shambhavi0325)
- 📧 [Email](mailto:shamkashyap25@gmail.com)

---

Made with 💙 and a little obsession for beautiful css libraries.

```