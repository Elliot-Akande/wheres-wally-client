import { css, keyframes, styled } from "styled-components";

const fadeout = keyframes`
  25%,
  60% {
    transform: scale(2) translate(-25%, -25%);
    opacity: 1;
  }
`;

const fadein = keyframes`
  0% {
      transform: translate(-50%, -400%);
      opacity: 0;
    }
`;

export const StyledTaggableImage = styled.div`
  width: 100%;
  margin-bottom: 96px;
  position: relative;

  border-radius: 16px;
`;

const marker = css`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50px;
  transform: translate(-50%, -50%);
`;

export const IncorrectImg = styled.img`
  ${marker}

  height: 16px;
  width: 16px;

  background-color: var(--error);
  box-shadow: 0 0 2px 2px var(--error);
  font-weight: bold;

  opacity: 0;
  animation: ${fadeout} 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  ${({ $coords }) => css`
    left: ${$coords.x}px;
    top: ${$coords.y}px;
  `}
`;

export const CorrectContainer = styled.div`
  ${marker}

  height: 25px;
  width: 25px;

  background-color: var(--accent-dark);
  box-shadow: 0 0 14px 14px var(--accent-dark);
  animation: ${fadein} 0.3s;

  ${({ $positionStyles }) => {
    return $positionStyles;
  }}
`;

export const CorrectImg = styled.img`
  max-height: 350%;
  max-width: 350%;
`;
