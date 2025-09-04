import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./sharedLayout";

import Home from "../pages/home.jsx";
import Categories from "../pages/categories.jsx";
import Library from "../pages/library.jsx";
import Bag from "../pages/bag.jsx";
import SignIn from "../pages/SignIn.jsx";
import Register from "../pages/Register.jsx";
import Contact from "../pages/contact.jsx";
import GameDetails from "../pages/GameDetails.jsx";
import NotFound from "../pages/notFound.jsx";
import About from "../pages/about.jsx";
import Terms from "../pages/terms.jsx";
import Admin from "../pages/admin.jsx";
import { GamesProvider } from "../context/GamesContext";
import { AuthProvider } from "../context/AuthContext";
import Owned from "../pages/owned.jsx";

function MainLayout() {
  return (
    <AuthProvider>
      <GamesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/categories" element={<Categories />} />
              <Route path="/library" element={<Library />} />
              <Route path="/bag" element={<Bag />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/owned" element={<Owned />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GamesProvider>
    </AuthProvider>
  );
}

export default MainLayout;
