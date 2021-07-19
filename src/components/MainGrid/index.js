import styled from "styled-components";

const MainGrid = styled.main`
  display: grid;
  column-gap: 10px;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  transform: translateY(50px);
  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  @media screen and (min-width: 860px) {
    grid-template-columns: 160px 1fr 312px;
    max-width: 1144px;
    margin: 0 auto;
  }
`;

export default MainGrid;
