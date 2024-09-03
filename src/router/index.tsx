import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layouts'; // Import Layout component
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import Products from '../pages/Product/Products';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Các trang không có Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Các trang có Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />

        {/* Đường dẫn không xác định, chuyển hướng về Home */}
        <Route
          path="*"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
