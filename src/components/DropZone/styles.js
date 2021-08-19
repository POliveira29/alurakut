import styled from "styled-components";

export const DropZone = styled.div`
  margin-bottom: 1rem;
  .zone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 8rem;
    padding: 1rem;
    font-size: 1rem;
    background-color: #f9fbfc;
    border: 2px dashed #dfe0f3;
    transition: border 0.3s ease-in;
  }
  .active {
    background-color: #edf2fe;
    border: 2px dashed #4085f4;
  }
  ul {
    display: flex;
    align-items: center;
  }
  li {
    display: grid;
    grid-template-columns: 0.6fr 2fr 0fr;
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    align-items: center;
    border: 2px solid #dfe0f3;

    div {
      display: grid;
      gap: 0.3rem;

      .name-image {
        font-weight: 600;
      }
    }
  }
`;
