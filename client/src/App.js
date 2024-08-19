import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import PageNotFound from "./components/Pages/PageNotFound";
import Login from "./components/Pages/LoginPage";
import Signup from "./components/Pages/Signup";
import Offcanvas from "./components/Offcanvas";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/Signup";
// import RequireAuth from "./components/RequireAuth";
import Cart from "./components/Pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
import ProductPage from "./components/Pages/ProductPage";
import RestaurantPage from "./components/Pages/RestaurantPage";
import Profile from "./components/Pages/Profile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Offcanvas />
          <LoginPage />
          <SignupPage />

          <Routes>
            <Route path="/" element={<Homepage />}></Route>

            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/resturant/:id" element={<RestaurantPage />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/profile/:id" element={<Profile></Profile>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            {/* <Route path='/cart' element={<RequireAuth><Cart/></RequireAuth>}></Route> */}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
