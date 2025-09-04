import React from "react";
import styled, { keyframes } from "styled-components";

// Ghost floating animation
const float = keyframes`
  0% { transform: translateY(-5px); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(-5px); }
`;

// Wrapper
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  height: 100px;
`;

// Title text
const TitleText = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 12px rgba(0, 255, 255, 0.6);
`;

// Ghost element
// Ghost element (smaller)
const Ghost = styled.div`
  width: 30px; /* reduced from 50px */
  height: 42px; /* reduced from 70px */
  background-color: var(--secondary-color, #00eaff);
  border-radius: 100% / 70% 70% 0% 0%;
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
  opacity: 0.9;

  /* Ghost body waves */
  div {
    position: absolute;
    width: 20%;
    background-color: var(--secondary-color, #00eaff);
  }

  div:nth-of-type(1) {
    height: 8px; /* reduced */
    left: 0;
    bottom: -6px;
    border-radius: 100% / 0% 0% 50% 50%;
  }

  div:nth-of-type(2),
  div:nth-of-type(4) {
    height: 6px; /* reduced */
    bottom: -4px;
    border-radius: 100% / 50% 50% 0% 0%;
    background-color: transparent;
  }

  div:nth-of-type(2) {
    left: 20%;
  }
  div:nth-of-type(3) {
    height: 6px; /* reduced */
    left: 40%;
    bottom: -5px;
    border-radius: 100% / 0% 0% 60% 60%;
    background-color: var(--secondary-color, #00eaff);
  }
  div:nth-of-type(4) {
    left: 60%;
  }
  div:nth-of-type(5) {
    height: 5px; /* reduced */
    left: 80%;
    bottom: -4px;
    border-radius: 100% / 0% 0% 70% 70%;
    background-color: var(--secondary-color, #00eaff);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 25%;
    width: 4px; /* reduced from 7px */
    height: 6px; /* reduced from 10px */
    background: var(--bgColor);
    border-radius: 50%;
  }
  &::before {
    left: 8px; /* reduced from 12px */
  }
  &::after {
    right: 8px; /* reduced from 12px */
  }
`;

const Title = () => {
  return (
    <TitleWrapper>
      <TitleText>LOOT BOX</TitleText>
      <Ghost aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
        <div />
        <span /> {/* mouth */}
      </Ghost>
    </TitleWrapper>
  );
};

export default Title;
