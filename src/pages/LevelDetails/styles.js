import { Link } from "react-router-dom";
import { css, styled } from "styled-components";

export const StyledLevelDetails = styled.div`
  margin: 48px 0;
  padding: 32px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  background-color: var(--neutral-700);
  border-radius: 16px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Heading = styled.h1`
  margin: 0;
`;

const buttonStyles = css`
  padding: 8px 16px;

  font-weight: bold;
  text-decoration: none;
  border-radius: 30px;

  transition: 0.1s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const StartButton = styled(Link)`
  ${buttonStyles}

  color: var(--neutral-100);
  background: linear-gradient(180deg, var(--accent), var(--accent-dark));
`;

export const BackButton = styled(Link)`
  ${buttonStyles}

  align-self: center;
  color: var(--neutral-100);
  background-color: var(--neutral-500);
`;
