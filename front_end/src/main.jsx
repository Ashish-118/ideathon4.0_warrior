import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx'
import Home from "./pages/home.jsx"
import Pyq from './pages/pyq.jsx'
import Layout from './components/layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import About from './pages/About.jsx'
import Book from './pages/book.jsx'
import Login from './pages/Login.jsx'
import { UserProvider } from './context/user.jsx'

import { Signup1Provider } from "./context/signup1.jsx";
import { Signup2Provider } from "./context/signup2.jsx";
import { PyqProvider } from './context/getPyq.jsx';
import { BookProvider } from './context/getBook.jsx';
import { FileProvider } from './context/attachementSelected.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>

        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='pyq' element={<Pyq />} />
        <Route path='book' element={<Book />} />


      </Route>
      <Route path='/Login' element={<Login />} />

    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <UserProvider>

      <Signup1Provider>

        <Signup2Provider>

          <PyqProvider>

            <BookProvider>

              <FileProvider>

                <RouterProvider router={router} />

              </FileProvider>

            </BookProvider>

          </PyqProvider>

        </Signup2Provider>

      </Signup1Provider>

    </UserProvider>

  </StrictMode>,
)
