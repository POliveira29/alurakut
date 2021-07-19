import styled from "styled-components";

const InputFile = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 10px;
  label {
    color: #333333;
  }
  div {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  input {
    width: 340px;
    max-width: 340px;
    background-color: #f4f4f4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 0;
    cursor: pointer;
  }
  button {
    justify-self: left;
    border-radius: 0;
    background-color: #2f4a71;
  }
`;

export default InputFile;
