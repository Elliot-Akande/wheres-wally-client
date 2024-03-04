import { styled } from "styled-components";

export const TopContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;

  width: 100%;
  margin-top: 32px;
  margin-bottom: 16px;
  padding: 16px 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 32px;

  background-image: linear-gradient(
    180deg,
    var(--neutral-700),
    var(--neutral-900)
  );
  border-radius: 16px;
  box-shadow: 0 -10px 14px 14px var(--neutral-900);
`;

export const Title = styled.h1`
  margin: 0;
`;
