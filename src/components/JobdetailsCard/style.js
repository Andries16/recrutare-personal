import styled from "styled-components";

export const JobDetailCard = styled.div`
  width: 1100px;
  margin: 40px auto;
  border-radius: 10px;
  border: 1px solid #3b3c40;
  display: flex;
`;

export const Right = styled.div`
  width: 75%;
  border-right: 1px solid #3b3c40;
  display: flex;
  flex-direction: column;
`;

export const Left = styled.div`
  width: 25%;
`;

export const Jobtitle = styled.h1`
  font-weight: 500;
  margin-bottom: 20px;
  padding: 14px;
`;

export const Jobspeciality = styled.p`
  text-decoration: underline;
  color: #108a00;
  cursor: pointer;
  padding: 14px;
`;

export const Span = styled.p`
  color: grey;
  display: block;
  padding-left: 14px;
  width: 780px;
  line-height: 22px;
`;
export const Jobdescription = styled.p`
  padding: 14px;
  text-align: justify;
  line-height: 22px;
  font-size: 14px;
  letter-spacing: 0.6px;
`;

export const JobStatus = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  & span {
    color: #5e6d55;
  }
  & p {
    width: 200px;
    color: #5e6d55;
  }
`;
