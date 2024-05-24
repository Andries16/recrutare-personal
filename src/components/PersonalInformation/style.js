import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 50px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  background: rgb(49, 58, 73);
  & img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  & span {
    margin-top: -12px;
    color: #444;
    font-size: 14px;
    margin-bottom: 10px;
  }
  & div {
    color: rgb(136, 136, 136);
  }
  &:hover {
    h2 {
      color: rgb(136, 136, 136);
      text-decoration: underline;
    }
    cursor: pointer;
  }
`;

export const Info = styled.ul`
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  background: rgb(49, 58, 73);
  & li svg {
    background-color: rgb(118, 171, 174);
    border: 1px solid #fff;
    width: 18px;
    margin-left: 60px;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
  }

  & li p {
    width: 150px;
    display: inline-block;
  }
  & li p span {
    display: block;
    margin-top: 12px;
    width: 200px;
    color: #888;
  }
`;

export const MoreInfo = styled.div`
  width: 320px;
  border: 1px solid #e4ebe4;
  border-radius: 10px;

  & p {
    display: inline-block;
    cursor: pointer;
  }

  & span {
    width: 200px;
    display: inline-block;
    margin-left: 20px;
  }
`;
