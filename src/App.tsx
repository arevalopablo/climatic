import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <WeatherProvider>
      <MainRoutes />
    </WeatherProvider>
  );
}

export default App;
