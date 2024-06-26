import styled from "styled-components";

export const Cardjob = styled.div`
  position: relative;
  padding: 20px 50px;
  margin: 20px;
  background: rgb(49 58 73);
  border-radius: 20px;
  &:hover {
    & h3 {
      color: #222831;
    }
  }
`;

export const Jobdetail = styled.div`
  font-size: 14px;
  display: flex;
  color: #888;
  gap: 2px;

  & span {
    color: #888;
  }
`;

export const JobDescription = styled.p`
  font-size: "16px";
`;

export const ToggleSaveBtn = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  top: 40px;
  right: 30px;
`;

export const Jobdetail2 = styled.div`
  display: flex;
  gap: 10px;
  & span {
    color: #888;
  }
`;
export const Span = styled.span`
  display: block;
  color: grey;
  cursor: pointer;
`;
export const P = styled.p`
  font-size: 22px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
