import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layouts"; // Import Layout component
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Products from "../pages/Product/Products";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import ContactUs from "../pages/ContactUs/ContactUs";
import Profile from "../pages/Profile/Profile";
import Blog from "../pages/blog/Blog";
import AdminAddProduct from "../pages/AdminAddProduct/AdminAddProduct";
import AdminGetAllProduct from "../pages/Admin/AdminGetAllProduct";
import AdminUpdateProduct from "../pages/Admin/AdminUpdateProduct";
import BlogDetail from "../pages/blog/BlogDetail";
import AddBlog from "../pages/blog/AddBlog";
import AdminGetAllUsers from "../pages/Admin/AdminGetAllUsers";
import AdminManageBlog from "../pages/Admin/AdminManageBlog";
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
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/blogs"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Layout>
              <BlogDetail />
            </Layout>
          }
        />
        <Route
          path="/addblog"
          element={
            <Layout>
              <AddBlog />
            </Layout>
          }
        />

        {/* admin */}
        <Route
          path="/admin/add-product"
          element={
            <Layout>
              <AdminAddProduct />
            </Layout>
          }
        />
        <Route
          path="/admin/manage-products"
          element={
            <Layout>
              <AdminGetAllProduct />
            </Layout>
          }
        />
        <Route
          path="/admin/manage-products/update/:id"
          element={
            <Layout>
              <AdminUpdateProduct />
            </Layout>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <Layout>
              <AdminGetAllUsers />
            </Layout>
          }
        />
        <Route
          path="/admin/manage-blogs"
          element={
            <Layout>
              <AdminManageBlog />
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
