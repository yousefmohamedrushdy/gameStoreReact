import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import SideMenu from "../components/sideMenu";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/footer.jsx";

function SharedLayout() {
  const [active, setActive] = useState(false);
  const location = useLocation();

  const handleSideActive = () => setActive((prev) => !prev);

  const showFooter =
    location.pathname !== "/contact" &&
    location.pathname !== "/admin" &&
    location.pathname !== "/signin" &&
    location.pathname !== "/register" &&
    location.pathname !== "/bag" &&
    location.pathname !== "/library" &&
    location.pathname !== "/owned";


  return (
    <>
      <SideMenu active={active} onClose={() => setActive(false)} />

      <div id="banner" className="banner">
        <Header toggle={handleSideActive} />
        <Outlet />
        <ScrollToTopButton targetId="banner" />
        {showFooter && <Footer />}
      </div>
    </>
  );
}

export default SharedLayout;
