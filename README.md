# 🎬 Movie Watchlist App (React + Vite)

A modern, responsive movie browsing and watchlist web application built with **React**, **Vite**, **Tailwind CSS**, and **The Movie Database (TMDB) API**.  
It supports **dark mode**, **movie details pages**, **global watchlist management**, and **smooth navigation** — all with a clean and cinematic UI/UX.

---

## 🚀 Tech Stack

- ⚛️ **React + Vite** – Fast frontend build and dev server  
- 🎨 **Tailwind CSS** – Utility-first styling  
- 🧠 **Context API** – Global state (Watchlist + Theme)  
- 🌙 **Dark Mode** – Persistent theme toggle with `localStorage`  
- 🔗 **React Router v6** – Routing and dynamic routes  
- 🎞️ **TMDB API** – Movie data (popular, details, credits)  
- 💾 **localStorage** – Persist user preferences & watchlist

---

## 📂 Project Structure

- `project/`
  - `public/`
  - `src/`
    - `assets/`
      - `react.svg`
    - `components/`
      - `Banner.jsx`
      - `Moviecard.jsx`
      - `MovieDetails.jsx`
      - `Movies.jsx`
      - `MovieSlider.jsx`
      - `Navbar.jsx`
      - `Pagination.jsx`
      - `Watchlist.jsx`
    - `context/`
      - `ThemeContext.jsx`
      - `WatchlistContext.jsx`
    - `App.jsx`
    - `index.css`
    - `main.jsx`
    - `MovieLogo.png`
  - `.gitignore`
  - `eslint.config.js`
  - `index.html`
  - `package-lock.json`
  - `package.json`
  - `README.md`
  - `server.js`
  - `vite.config.js`



---

## ✨ Core Features

### 🌙 Dark Mode (Persistent)
- Theme managed via `ThemeContext`
- Preference saved in `localStorage`
- Tailwind `dark:` utility classes used throughout


🎥 Movie Details Page

Full-featured details page for each movie.

Dynamic data from TMDb API:

GET /movie/:id
GET /movie/:id/credits


Displays

Title, Rating, Runtime, Genre, Overview

Director, Status, Language, Budget & Revenue

Top 10 Cast Members with photos

Integrated Watchlist (Add/Remove)

Smooth animations and responsive layout

📋 Watchlist Management

Global watchlist state using useContext.

Add / remove movies from anywhere.
Persist data in localStorage so it survives reloads.

🔁 Hooks & UX Enhancements

useContext for global state, useRef for smooth scroll and input focus.

const { watchlist, handleAddtoWatchlist } = useContext(WatchlistContext);
const moviesTopRef = useRef(null);
moviesTopRef.current?.scrollIntoView({ behavior: "smooth" });

🧩 App Routing
<ThemeProvider>
  <WatchlistProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<><MovieSlider /><Movies /></>} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  </WatchlistProvider>
</ThemeProvider>

💡 UI / UX Highlights
Feature	Description
🌙 Dark/Light Mode	Persistent theme with smooth transition
❤️ Watchlist	Add/remove instantly across pages
🎞️ Movie Details	Cinematic layout with backdrop and cast
🔍 Search & Filter	Real-time filtering
📱 Responsive Design	Mobile-first layout
⚙️ Auto-scroll	Smooth page transition
🧠 Context API	No prop drilling
📊 API Usage
# Popular movies
GET https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&page=1

# Movie details
GET https://api.themoviedb.org/3/movie/{id}?api_key=YOUR_API_KEY

# Movie credits
GET https://api.themoviedb.org/3/movie/{id}/credits?api_key=YOUR_API_KEY

🎨 Color Palette
Mode	Background	Text	Accent
🌞 Light	White / Gray-100	Gray-900	Blue-600
🌙 Dark	Gray-900 / Black	White / Gray-100	Blue-400
📱 Responsive Design

Mobile: single column

Tablet: optimized spacing

Desktop: two-column layouts

🧠 React Hooks Used
Hook	Purpose
useState	Component state
useEffect	Fetch + localStorage sync
useContext	Global state
useRef	Scroll / focus management
🧭 Future Enhancements

 Movie trailers (YouTube embed)

 Similar / recommended movies

 User reviews & ratings

 System theme auto-detect

 Custom color themes

 Share / bookmark feature

⚙️ Run Locally
git clone https://github.com/your-username/movie-watchlist.git
cd movie-watchlist
npm install
npm run dev


Then open → http://localhost:5173

🧾 License

Released under the MIT License

👨‍💻 Author

Abhinav P — Frontend Developer | React Enthusiast
📧 [abhinavputhenveetil@gmail.com](mailto:abhinavputhenveetil@gmail.com)  
🔗 [www.linkedin.com/in/abhinav-p-2400072bb](https://www.linkedin.com/in/abhinav-p-2400072bb)


🎉 Summary

Modern React architecture (Context + Hooks)

Persistent dark mode + watchlist

TMDb movie details with cinematic UI

Clean, maintainable & scalable codebase

Enjoy exploring movies with personalized watchlist! 🍿🎥

---

