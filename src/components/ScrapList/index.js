import styled from "styled-components";

export const ScrapList = styled.div`
  padding: 20px;
  background-color: #fff;
  .scrap__header {
    padding-bottom: 20px;
  }
  .scrap__list {
    margin-top: 20px;
  }
  .scrap__item {
    display: flex;
    gap: 20px;
  }
  .scrap__avatar {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
  .scrap__author {
    font-weight: 600;
    color: #2e7bb4;
  }
  .scrap__text {
    margin-top: 10px;
  }
`;
