import styled from "styled-components";

export const WrapperList = styled.div`
  background-color: #fff;
  border-radius: 8px;
  .breadcrumb {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #999;
    a {
      color: #2e7bb4;
    }
  }
  .list__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .amount-friends {
      font-size: 14px;
      color: #333;
    }
    .nav-items,
    .nav-item {
      display: flex;
      align-items: center;
    }
    .nav-items a {
      color: #333;
    }
    .nav-item:nth-child(n + 1):after {
      content: "";
      margin: 0 8px;
      width: 2px;
      height: 14px;
      background-color: #333;
    }
    .nav-item:last-child:after {
      content: "";
      margin: 0;
      width: 0;
      height: 0;
      background-color: transparent;
    }
  }

  .list__items {
    display: grid;
    margin-top: 16px;
  }

  .list__items li {
    display: grid;
    grid-template-columns: 120px 1fr;
    column-gap: 30px;
    align-items: flex-start;
    padding: 16px;
    background-color: #d9e6f6;
  }
  .list__items li:first-child {
    border-radius: 8px 8px 0 0;
  }
  .list__items li:last-child {
    border-radius: 0px 0px 8px 8px;
  }
  .list__items li:nth-child(2n) {
    background-color: #f1f9fe;
  }

  .list__items span {
    margin-top: 14px;
    color: #2e7bb4;
  }
  .list__image {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
