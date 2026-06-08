import { Route, Routes } from "react-router-dom";
import Home from "../views/home/Home";
import WeatherDashboard from "../views/dashboard/WeatherDashboard";
import WeatherGrid from "../views/dashboard/components/WeatherGrid";
import Favourites from "../views/favourites/Favourites";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<WeatherDashboard />}>
        <Route index element={<WeatherGrid />} />
        <Route path="favoritos" element={<Favourites />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
