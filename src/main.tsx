import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.js'
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage.js'
import SearchPage from './pages/SearchPage.js'
import MoviePage from './pages/MoviePage.jsx'
import MovieImages from './pages/MovieImages.js'
import PlayerPage from './pages/PlayerPage.js'
import ActorPage from './pages/ActorPage.js'
import DirectorPage from './pages/DirectorPage.js'

const router = createBrowserRouter([
  {path: "/", element:<App/>},
  {path: "*", element:<NotFoundPage/>},
  {path: "/login", element: <LoginPage />},
  {path: "/signup", element: <RegisterPage />},
  {path: "/search", element: <SearchPage />},
  {path: "/movie/:movieId", element: <MoviePage />},
  {path: "/movie/:movieId/images", element: <MovieImages />},
  {path: "/movie/:movieId/player", element: <PlayerPage />},
  {path: "/actor/:actorId", element: <ActorPage />},
  {path: "/director/:directorId", element: <DirectorPage />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
