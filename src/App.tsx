import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import NavBar from "./components/navbar/NavBar";
import User from "./pages/User";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Toaster } from "sonner";
import Oferts from "./pages/Oferts";
import Gastronomics from "./pages/Gastronomics";
import Drinks from "./pages/Drinks";
import Desserts from "./pages/Desserts";
import Snacks from "./pages/Snacks";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Order from "./pages/Order";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster richColors expand={true} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<NavBar />}>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<User />} />
                <Route path="/oferts" element={<Oferts />} />
                <Route path="/gastronomics" element={<Gastronomics />} />
                <Route path="/drinks" element={<Drinks />} />
                <Route path="/desserts" element={<Desserts />} />
                <Route path="/snacks" element={<Snacks />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/events" element={<Events />} />
                <Route path="/order" element={<Order />} />

                
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
