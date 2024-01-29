import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 16px;
  font-family: "Jaldi";
  padding-left: 5px;
  padding-right: 5px;

  @media (min-width: 490px) {
    font-size: 20px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const StyledButtonRightsided = styled(StyledButton)`
  position: relative;
  left: 90%;
`;

export const StyledButtonCenter = styled(StyledButton)`
  position: relative;
  left: 40%;
`;

export const StyledButtonInspirationviewComment = styled(StyledButton)`
  height: 35px;
  width: 150px;
`;
