import styled from "styled-components";

const Box = styled.div`
  border-radius: 8px;
  background-color: #fff;
  /* CSS Pré-Pronto */
  padding: 20px;
  margin-bottom: 10px;
  img {
    border-radius: 8px;
  }
  p {
    margin-bottom: 12px;
  }
  .boxLink {
    font-size: 14px;
    color: #2e7bb4;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .actionButtons {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    .active {
      color: #fff;
      background-color: #6f92bb;
    }
    button {
      color: #2e7bb4;
      background-color: #d9e6f6;
      border-radius: 8px;
    }
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }
  input {
    width: 100%;
    background-color: #f4f4f4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  textarea {
    width: 100%;
    padding: 1rem;
    resize: none;
    box-shadow: inset 0px 1px 2px 2px #ccc;
  }
  #testimony {
    border-radius: 4px;
    box-shadow: none;
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 10000px;
    background-color: #6f92bb;
  }
  .info-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    background-color: #d9e6f6;
  }
  .info-item:nth-child(2n) {
    background-color: #f1f9fe;
  }
`;

export default Box;
