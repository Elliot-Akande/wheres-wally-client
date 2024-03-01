import { styled } from "styled-components";

export const Placeholder = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.$customStyles}
`;

export const Image = styled.img`
  transition: 0.3s;
  opacity: ${(props) => (props.$loading ? 0 : 1)};

  ${(props) => props.$customStyles};
`;
