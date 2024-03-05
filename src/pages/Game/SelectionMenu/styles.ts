import { styled, css } from "styled-components";

export const StyledSelectionMenu = styled.ul<{
  $isLeft: boolean,
}>`
  margin: 0;
  padding: 0;

  position: absolute;
  top: 50%;
  left: 100%;

  display: flex;
  flex-direction: column;

  list-style: none;
  background-image: linear-gradient(
    90deg,
    var(--neutral-700),
    var(--neutral-900)
  );
  border-radius: 8px;
  transform: translate(10px, -50%);

  overflow: hidden;
  pointer-events: auto;

  ${({ $isLeft }) =>
    $isLeft &&
    css`
      right: 100%;
      left: auto;
      transform: translate(-10px, -50%);
    `}
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;

  display: flex;
  align-items: center;
  gap: 4px;

  cursor: pointer;
  color: var(--neutral-100);
  background: none;
  border: none;

  &:hover {
    background-image: linear-gradient(
      270deg,
      var(--accent-dark),
      var(--neutral-700)
    );
  }
`;

export const Image = styled.img`
  height: 36px;
  width: 36px;

  flex-shrink: 0;
  object-fit: contain;
`;
