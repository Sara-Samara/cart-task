import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return(<>
  <RouterProvider router={router} />
  <ToastContainer position="top-right" autoClose={3500} />
  </>
  );

}