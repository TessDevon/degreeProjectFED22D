import styled from "styled-components";

export const StyledH1 = styled.h1`
  color: #7e6829;
  font-family: "Alex Brush";
  font-size: 36px;
  margin: 15px;
  margin-bottom: 0px;
  padding: 0px;
  text-shadow: 1px 2px 2px #c7a440;

  @media (min-width: 768px) {
    font-size: 36px;
    text-shadow: 1px 1px 1px #c7a440;
  }

  @media (min-width: 1170px) {
    font-size: 46px;
  }

  @media (min-width: 1410px) {
    margin-bottom: 10px;
    font-size: 56px;
  }
`;

export const StyledH2 = styled.h1`
  color: #7e6829;
  font-family: "Antic Didone";
  text-align: center;
  font-size: 24px;
  text-shadow: 1px 1px 1px #c7a440;

  @media (min-width: 760px) {
  font-size: 36px;
  }

  @media (min-width: 1410px) {
    margin-bottom: 10px;
    font-size: 40px;
  }

  
`;

export const StyledH3 = styled.h3`
  font-family: "Antic Didone";
  font-size: 18px;
  text-align: center;
  margin: 0px;
  color: #7e6829;
  
  text-shadow: 1px 1px 1px #c7a440;
  
  @media (min-width: 760px) {
  font-size: 24px;

  }

  @media (min-width: 1410px) {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

export const StyledLogin = styled(StyledH3)`
  margin-top: 40px;
  margin-bottom: -30px;
`

export const StyledRegistration = styled(StyledH3)`
  margin-top: 40px;
  margin-bottom: -40px;
`

export const StyleH3Gold = styled(StyledH3)`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #7e6829;
`
