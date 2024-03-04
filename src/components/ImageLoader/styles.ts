import { styled, Interpolation } from "styled-components";

export const Placeholder = styled.div<{
  $customStyles?: Interpolation<React.CSSProperties>,
}>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({$customStyles}) => $customStyles}
`;

export const Image = styled.img<{
  $customStyles?: Interpolation<React.CSSProperties>,
  $loading: boolean,
}>`
  transition: 0.3s;
  opacity: ${({$loading}) => ($loading ? 0 : 1)};

  ${({$customStyles}) => $customStyles};
`;
