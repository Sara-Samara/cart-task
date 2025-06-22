import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Register from "./pages/register/Register";
import SecondaryLayout from "./layout/SecondaryLayout";
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import VerificationPage from "./pages/validate/VerificationPage";
import NewPassword from "./pages/newpassword/NewPassword";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SecondaryLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        path: 'register',
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      { 
        path: 'login',
        element: <Login />,
      },
      {
        path:'forgot-password',
        element: <ForgetPassword/>,
      },
      {
        path:'validate',
        element: <VerificationPage/>,
      },
      {
        path:'new-password',
        element: <NewPassword/>,
      }
    ]
  },
]);

export default router;