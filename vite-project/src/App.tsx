import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ErrorPage from './routes/ErrorPage/ErrorPage';
import UserInfoPage from './routes/UserInfoPgae/UserInfoPage';
import './store/themeStyles.scss';
import { useAppSelector } from './app/hooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
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

  const theme = useAppSelector(state => state.theme.light);

  return (
    <RouterProvider router={router} />
  )
}

export default App
