import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  @media (max-width: 1100px) {
    align-items: stretch;
    flex-direction: column;
  };
`;
