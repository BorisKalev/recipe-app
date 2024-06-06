import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import DishTypes from "./DishTypes";
import Favorites from "./Favorites";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />}></Route>
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<Recipe />}></Route>
        <Route path="/dish-type/:type" element={<DishTypes />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
