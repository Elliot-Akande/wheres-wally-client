import { css, styled } from "styled-components";

export const StyledChecklistItem = styled.li<{
  $checked: boolean
}>`
  padding: 8px 16px;

  display: flex;
  align-items: center;
  gap: 10px;

  background-color: var(--neutral-500);
  border-radius: 8px;
  transition: 0.3s;

  ${({ $checked }) =>
    $checked &&
    css`
      opacity: 0.5;
      text-decoration: line-through;
    `}
`;

export const imgStyles = css`
  max-height: 50px;
  max-width: 50px;
`;
