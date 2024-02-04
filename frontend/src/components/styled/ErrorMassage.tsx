import styled from "styled-components";

export const ErrorMassage = styled.p`
  color: #9f2033;
  font-family: "Jaldi";
  font-size: 24px;
  text-align: center;
`;

export const ErrorLeftcenterdMassage = styled(ErrorMassage)`
  text-align: left;
`;


export const OkMassage = styled(ErrorMassage) `
  color:#c7a440;
`