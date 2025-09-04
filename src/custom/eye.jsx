import React from "react";
import styled from "styled-components";

const Eye = () => {
  return (
    <StyledWrapper>
      <div className="btn-container">
        <div style={{ "--a": 0 }} className="btn-sensor sensor-n" />
        <div style={{ "--a": 45 }} className="btn-sensor sensor-ne" />
        <div style={{ "--a": 90 }} className="btn-sensor sensor-e" />
        <div style={{ "--a": 135 }} className="btn-sensor sensor-se" />
        <div style={{ "--a": 180 }} className="btn-sensor sensor-s" />
        <div style={{ "--a": 225 }} className="btn-sensor sensor-sw" />
        <div style={{ "--a": 270 }} className="btn-sensor sensor-w" />
        <div style={{ "--a": 315 }} className="btn-sensor sensor-nw" />
        <button className="btn-button">
          <div className="btn-lid" />
          <div className="btn-pupil" />
        </button>
        <button className="btn-button">
          <div className="btn-lid" />
          <div className="btn-pupil" />
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-container {
    --pupil-color: rgb(156, 207, 255);
    --pupil-move: 20%;
    --sensor-height: 130vmax;
    --sensor-width: calc(var(--sensor-height) * 82.84 / 100);
    position: relative;
  }

  .btn-button {
    --back-color: #fff;
    background: #fff;
    border: 3px solid #000;
    border-radius: 10rem;
    cursor: pointer;
    padding: 2rem;
    position: relative;
    z-index: 100;
  }

  .btn-button:hover,
  .btn-button:hover .btn-lid {
    animation: squint 100ms forwards;
  }

  .btn-button:active .btn-pupil {
    animation: agitate 100ms infinite 500ms;
    border-width: 0.5rem;
    padding: 1rem;
  }

  .btn-lid {
    border-radius: 10rem;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 101;
    --back-color: transparent;
  }

  .btn-pupil {
    background: #000;
    border: 0.8rem solid var(--pupil-color);
    border-radius: 10rem;
    padding: 0.7rem;
    transition: all 200ms ease-out;
  }

  .btn-sensor {
    clip-path: polygon(0 0, 100% 0, 50% 100%, 0 0);
    height: var(--sensor-height);
    width: var(--sensor-width);
    left: calc(50% - var(--sensor-width) / 2);
    top: calc(50% - var(--sensor-height) / 2);
    position: absolute;
    overflow: hidden;
    transform: rotate(calc(var(--a) * 1deg))
      translateY(calc(var(--sensor-height) * -50 / 100));
    z-index: 99;
  }

  /* Tracking */
  .sensor-n:hover ~ .btn-button .btn-pupil {
    transform: translateX(0) translateY(calc(-3 * var(--pupil-move)));
  }
  .sensor-ne:hover ~ .btn-button .btn-pupil {
    transform: translateX(calc(2 * var(--pupil-move)))
      translateY(calc(-2 * var(--pupil-move)));
  }
  .sensor-e:hover ~ .btn-button .btn-pupil {
    transform: translateX(calc(3 * var(--pupil-move))) translateY(0);
  }
  .sensor-se:hover ~ .btn-button .btn-pupil {
    transform: translateX(calc(2 * var(--pupil-move)))
      translateY(calc(2 * var(--pupil-move)));
  }
  .sensor-s:hover ~ .btn-button .btn-pupil {
    transform: translateX(0) translateY(calc(3 * var(--pupil-move)));
  }
  .sensor-sw:hover ~ .btn-button .btn-pupil {
    transform: translateX(calc(-2 * var(--pupil-move)))
      translateY(calc(2 * var(--pupil-move)));
  }
  .sensor-w:hover ~ .btn-button .btn-pupil {
    transform: translateX(calc(-3 * var(--pupil-move))) translateY(0);
  }
  .sensor-nw:hover ~ .btn-button .btn-pupil {
    transform: translateX(calc(-2 * var(--pupil-move)))
      translateY(calc(-2 * var(--pupil-move)));
  }

  @keyframes agitate {
    0% {
      transform: scale(1.2) translate(0%, -10%);
    }
    25% {
      transform: scale(1.2) translate(-10%, 10%);
    }
    50% {
      transform: scale(1.2) translate(10%, -5%);
    }
    75% {
      transform: scale(1.2) translate(-10%, -5%);
    }
    100% {
      transform: scale(1.2) translate(10%, 10%);
    }
  }

  @keyframes squint {
    0% {
      background: var(--back-color);
    }
    25% {
      background: linear-gradient(
        0deg,
        #000 0% 9%,
        var(--back-color) 10% 90%,
        #000 91% 100%
      );
    }
    50% {
      background: linear-gradient(
        0deg,
        #000 0% 18%,
        var(--back-color) 19% 81%,
        #000 82% 100%
      );
    }
    75% {
      background: linear-gradient(
        0deg,
        #000 0% 27%,
        var(--back-color) 28% 72%,
        #000 73% 100%
      );
    }
    100% {
      background: linear-gradient(
        0deg,
        #000 0% 35%,
        var(--back-color) 36% 64%,
        #000 65% 100%
      );
    }
  }
`;

export default Eye;
