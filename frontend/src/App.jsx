import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);

  
  return <>
  <RouterProvider router={router} />
  <ToastContainer autoClose={3000} position="top-right" />
  </> 
}

export default App;