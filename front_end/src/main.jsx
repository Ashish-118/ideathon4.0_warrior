import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./pages/home.jsx"
import Pyq from './pages/pyq.jsx'
import Layout from './components/layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import About from './pages/About.jsx'
import Book from './pages/book.jsx'
import Login from './pages/Login.jsx'
import { UserProvider } from './context/user.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='pyq' element={<Pyq />} />
        <Route path='book' element={<Book />} />
        {/* <Route path='profile' element={<Profile />} /> */}

      </Route>
      <Route path='/Login' element={<Login />} />
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
