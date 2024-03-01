import { css, styled } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLevelCard = styled(Link)`
  height: 300px;
  position: relative;

  border-radius: 16px;
  transition: 0.2s;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }

  &::after {
    height: 200px;
    width: 200px;
    padding: 12px;

    content: "Play!";
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: center;

    font-size: 24px;
    color: var(--neutral-100);
    background: linear-gradient(180deg, var(--accent), var(--accent-dark) 32%);

    opacity: 0;
    transform: translate(100%, 100%) rotate(-45deg);
    transition: all 0.2s;
  }

  &:hover::after {
    opacity: 1;
    transform: translate(60%, 60%) rotate(-45deg);
  }
`;

export const Title = styled.h2`
  padding: 16px 32px;
  margin: 0;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  font-weight: bold;
  font-size: 24px;
  color: var(--neutral-100);
  background: linear-gradient(180deg, var(--neutral-900), transparent 50%);
`;

export const imgStyles = css`
  min-width: 100%;
  height: 100%;
  object-fit: cover;

  border-radius: 16px;
`;
