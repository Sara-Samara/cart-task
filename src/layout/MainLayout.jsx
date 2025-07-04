import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';

export default function MainLayout() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
