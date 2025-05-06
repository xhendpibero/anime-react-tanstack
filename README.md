# AnimeList React App

A simple React application that displays a list of anime titles and shows detailed information for each title. Built with React, React Router, and styled with Tailwind CSS (you can swap in your favorite UI library). Data is fetched from the [Jikan API](https://jikan.moe/), an unofficial MyAnimeList REST API.

---

## Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
- [Available Scripts](#available-scripts)  
- [Project Structure](#project-structure)  
- [API Reference](#api-reference)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## Features

- Browse a paginated list of popular anime  
- Search for anime by title  
- View detailed information (synopsis, episodes, score, genres)  
- Responsive design (mobile & desktop)  
- Error handling & loading states  

---

## Demo

![AnimeList Home](https://user-images.githubusercontent.com/your-username/anime-list-demo.gif)

Live Demo: https://anime.ti2k.space

---

## Tech Stack

- React  
- React Router v6  
- Axios (for HTTP requests)  
- Tailwind CSS (for styling)  
- Jikan REST API  

---

## Getting Started

### Prerequisites

- Node.js v16+  
- npm v8+ or yarn v1.22+  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/xhendpibero/anime-react-tanstack.git
   cd anime-list
   ```

2. Install dependencies  
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root (see below).  

4. Run the development server  
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open http://localhost:3000 in your browser.  

### Environment Variables

Rename `.env.example` to `.env` and set any custom variables. The Jikan API does not require a key, but if you swap in a different API, configure it here:

```
REACT_APP_API_BASE_URL=https://api.jikan.moe/v4
```

---

## Available Scripts

In the project directory, you can run:

- `npm start`  
  Runs the app in development mode.  
- `npm run build`  
  Bundles the app into static files for production.  
- `npm test`  
  Launches the test runner (if tests are configured).  
- `npm run lint`  
  Lints source code with ESLint.  

---

## Project Structure

```
anime-list/
├─ public/
│  ├─ index.html
│  └─ favicon.ico
├─ src/
│  ├─ assets/            # Images, icons, fonts
│  ├─ components/        # Reusable UI components
│  │   ├─ AnimeCard.jsx
│  │   ├─ Loader.jsx
│  │   └─ SearchBar.jsx
│  ├─ pages/             # Routeable pages
│  │   ├─ HomePage.jsx
│  │   └─ DetailPage.jsx
│  ├─ services/          # API call functions
│  │   └─ animeService.js
│  ├─ App.jsx            # Application root & router
│  ├─ index.js           # ReactDOM render
│  └─ styles/            # Global styles (Tailwind config)
├─ .env.example
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## API Reference

We use the [Jikan API v4](https://docs.api.jikan.moe/):

- `GET /anime` – List anime (with pagination & search)  
- `GET /anime/{id}` – Anime details  

All requests are handled in `src/services/animeService.js`.

---

## Contributing

1. Fork this repository  
2. Create your feature branch (`git checkout -b feature/MyFeature`)  
3. Commit your changes (`git commit -m 'Add MyFeature'`)  
4. Push to the branch (`git push origin feature/MyFeature`)  
5. Open a Pull Request  

Please ensure your code follows the existing style and includes relevant tests or documentation updates.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Contact

Dendy Sapto Adi – [@dendy.s.a](https://www.linkedin.com/in/dendysaptoadi/) – dendysaptoadi160@gmail.com  
Project Link: https://github.com/xhendpibero/anime-react-tanstack