import { keyframes, styled } from "styled-components";

const menu = keyframes`
  0% {
    transform: translateY(-200%) scale(0.4);
  }

  0%,
  25% {
    opacity: 0;
  }
`;

const container = keyframes`
  0% {
    background-color: transparent;
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #0000007c;
  animation: ${container} 0.3s;
`;

export const Menu = styled.div`
  max-width: min-content;
  padding: 32px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  background-color: var(--neutral-700);
  border-radius: 16px;
  animation: ${menu} 0.3s;
`;

export const Heading = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const Score = styled.p`
  margin: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
  margin-top: 4px;
  margin-bottom: 8px;

  color: var(--neutral-100);
  background-color: var(--neutral-500);
  border: 2px solid var(--neutral-400);
  border-radius: 8px;

  &:focus-visible {
    border-color: var(--accent);
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 16px;

  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 50px;
  color: var(--neutral-100);
  background: linear-gradient(180deg, var(--accent), var(--accent-dark));

  transition: 0.1s;

  &:hover {
    transform: scale(1.04);
  }
`;
