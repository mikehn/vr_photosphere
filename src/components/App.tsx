import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'aframe'
import Demo from 'screens/Demo.view'
import Show from 'screens/Show.view'
import AdminPage from '../screens/Admin.view'
import ErrorPage from '../screens/Error.view'
import Home from '../screens/Home.view'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/demo',
    element: <Demo />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/show/:id',
    element: <Show />
  },
  {
    path: '/q',
    element: <Show isQ={true} />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
