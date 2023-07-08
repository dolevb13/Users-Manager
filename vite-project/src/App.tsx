import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ErrorPage from './routes/ErrorPage/ErrorPage';
import UserInfoPage from './routes/UserInfoPage/UserInfoPage';
import './store/themeStyles.scss';
import { useAppSelector } from './app/hooks';
import LoginPage from './routes/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/:userId',
    element: <UserInfoPage/>
  },
  {
    path: '/about',
    element: <ErrorPage/>   // TODO: Change to another page  
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
