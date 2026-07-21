import Header from "./components/Header";
import Home from "./components/Homepage";
import Background from "./components/Background";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProfileDetails from "./components/profileDetails";

import { Animator } from "./styles/animations";
import { AnimatePresence } from "framer-motion";

function AnimateRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/home/:passedUid"
          element={
            <Animator>
              <Home />{" "}
            </Animator>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/profiledetails/:uid"
          element={
            <Animator>
              <ProfileDetails />
            </Animator>
          }
        />
        <Route path="/" element={<Background />} />
      </Routes>
    </AnimatePresence>
  );
}
function App() {
  return (
    <BrowserRouter>
      <div style={{ maxHeight: "100vh" }}>
        <Header />
      </div>

      <AnimateRoutes />
    </BrowserRouter>
  );
}

export default App;
