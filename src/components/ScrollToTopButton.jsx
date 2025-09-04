import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = ({ targetId }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const target = document.getElementById(targetId);
    if (target && target.scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target) {
      target.addEventListener("scroll", toggleVisibility);
      return () => target.removeEventListener("scroll", toggleVisibility);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isVisible && (
      <StyledWrapper>
        <button className="button" onClick={scrollToTop}>
          <FaArrowUp className="icon" />
        </button>
      </StyledWrapper>
    )
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;

  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #19293858;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.181);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
  }

  .icon {
    font-size: 18px;
    color: white;
    transition: transform 0.3s ease;
  }

  .button:hover .icon {
    transform: translateY(-3px) scale(1.1);
  }
`;

export default ScrollToTopButton;
