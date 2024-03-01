import { styled } from "styled-components";

export const Status = styled.p`
  margin: 0;
`;

export const StyledLeaderboard = styled.div`
  width: 260px;
  padding: 16px;

  background-color: var(--neutral-500);
  border-radius: 8px;
`;

export const Heading = styled.h2`
  margin: 0;
  padding-bottom: 16px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 8px;
  height: 180px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  overflow-y: scroll;

  list-style: none;
  background-color: var(--neutral-400);
  border-radius: 4px;
`;

export const Item = styled.li`
  height: max-content;

  display: flex;
  justify-content: space-between;
  gap: 8px;

  border-bottom: 1px solid var(--neutral-700);
`;

export const Name = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow-x: clip;
  text-overflow: ellipsis;
`;

export const Score = styled.span`
  text-align: end;
`;
