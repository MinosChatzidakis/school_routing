import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashPage from "./Pages/Splash/Splash";
import InPersonPage from "./Pages/InPerson/InPerson";
import OnlinePage from "./Pages/Online/Online";
import logo from "./assets/logo.png";

function App() {
  return (
    <BrowserRouter>
      <div className="logo">
        <img src={logo} class="logoimg" />
      </div>
      <div className="app-container">
        <Routes>
          {/* When the URL is '/', render the Home component */}
          <Route path="/" element={<SplashPage />} />
          {/* When the URL is '/about', render the About component */}
          <Route path="/in-person" element={<InPersonPage />} />
          <Route path="/online" element={<OnlinePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
