import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Switch = () => {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDark(saved === "dark");
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  // Update theme when toggled
  const handleToggle = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setDark(newTheme === "dark");
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <StyledWrapper>
      <label className="switch">
        <input
          id="input"
          type="checkbox"
          checked={dark}
          onChange={handleToggle}
        />
        <div className="slider round">
          {/* 🌙☀️ your fancy SVGs remain the same */}
          <div className="sun-moon">{/* ... (all your SVGs unchanged) */}</div>
          <div className="stars">{/* ... (all your SVGs unchanged) */}</div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* your full styled-components CSS from before */
`;

export default Switch;
