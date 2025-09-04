import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  from { transform: scale(0.9); opacity: 1; }
  to { transform: scale(2.2); opacity: 0; }
`;

const slideFadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideFadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;

  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 400px;
    width: 100%;
    padding: 24px;
    border-radius: 16px;
    background: #1e293b;
    color: #e2e8f0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    animation: ${fadeIn} 0.6s ease-out;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    color: #22d3ee;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
    padding-left: 25px;
  }

  .title::before,
  .title::after {
    content: "";
    position: absolute;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #22d3ee;
  }

  .title::after {
    animation: ${pulse} 1.2s infinite;
  }

  .message {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .flex {
    display: flex;
    gap: 10px;
  }

  .input-group {
    position: relative;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .input {
    width: 100%;
    padding: 12px 14px; /* slightly bigger */
    border-radius: 10px;
    border: 1px solid #334155;
    background: #0f172a;
    font-size: 14px; /* slightly bigger text */
    color: #e2e8f0;
    transition: all 0.22s ease;
    &::placeholder {
      color: transparent;
      opacity: 0;
    }
  }

  .input:focus {
    outline: none;
    border-color: #22d3ee;
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
    background: #1e293b;
  }

  .label {
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 13px;
    color: #64748b;
    pointer-events: none;
    transition: 0.18s ease all;
    padding: 0 4px;
    border-radius: 4px;
  }

  .input:focus + .label,
  .input:not(:placeholder-shown) + .label {
    top: -8px;
    left: 10px;
    font-size: 11px;
    color: #22d3ee;
    background: #1e293b;
  }

  .error-text {
    display: none;
  }

  .input-group.error .error-text {
    display: block;
    color: red;
    font-size: 0.75rem;
    margin-top: 0.15rem;
  }

  .submit {
    background: linear-gradient(90deg, #22d3ee, #0ea5e9);
    border: none;
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit:hover {
    background: linear-gradient(90deg, #0ea5e9, #22d3ee);
    box-shadow: 0 5px 15px rgba(34, 211, 238, 0.2);
  }

  .signin {
    text-align: center;
    font-size: 14px;
    color: #94a3b8;
    margin-top: 6px;
  }

  .signin a {
    color: #22d3ee;
    text-decoration: none;
    font-weight: 500;
  }

  .signin a:hover {
    text-decoration: underline;
  }

  .fixed-alert {
    position: fixed;
    top: 20px;
    transform: translateX(-50%);
    z-index: 9999;
    max-width: 400px;
    text-align: center;
    border-radius: 8px;
    padding: 0.9rem 1.2rem;
    font-weight: 600;
    animation: ${slideFadeIn} 0.5s ease forwards,
      ${slideFadeOut} 0.5s ease 1.5s forwards;
  }
`;

export default StyledWrapper;
