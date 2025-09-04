import React from "react";
import styled from "styled-components";
const Menu = () => {
  return (
    <StyledWrapper>
      <button className="setting-btn">
        <span className="bar bar1" />
        <span className="bar bar2" />
        <span className="bar bar1" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .setting-btn {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    background-color: var(--bgColor);
    border-radius: 10px;
    cursor: pointer;
    border: none;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .setting-btn:hover {
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }

  .bar {
    width: 50%;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
    position: relative;
    transition: all 0.3s ease;
  }

  .bar::before {
    content: "";
    width: 7px;
    height: 7px;
    background-color: var(--bgColor);
    position: absolute;
    border-radius: 10px;
    border: 2px solid #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    box-shadow: 0 0 5px #fff;
  }

  .bar1::before {
    transform: translate(-50%, -50%) translateX(-4px);
  }

  .bar2::before {
    transform: translate(-50%, -50%) translateX(4px);
  }

  .setting-btn:hover .bar1::before {
    transform: translate(-50%, -50%) translateX(4px);
  }

  .setting-btn:hover .bar2::before {
    transform: translate(-50%, -50%) translateX(-4px);
  }
`;

export default Menu;
