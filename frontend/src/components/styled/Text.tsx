import styled from "styled-components";

export const StyledText = styled.p`
  font-family: "Jaldi";
  margin-bottom: 0px;
  font-size: 18px;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const StyleTextBlock = styled(StyledText)`
  display: block;
`;

export const StyledTextFlow = styled(StyledText)`
  float: inline-end;
`;

export const StyledTextBold = styled(StyledText)`
  font-weight: bold;
`;

export const StyledTextBlock = styled(StyledText)`
  display: block;
`;

export const FooterText = styled(StyledText)`
  text-shadow: 1px 1px 1px #c7a440;
  font-size: 18px;
  margin: 0px 15px;
  text-align: end;
`;

export const StyledTextGold = styled(StyledTextBold)`
  text-shadow: 1px 0.5px 0.5px #c7a440;
  color: #7e6829;
`;

export const StyledSpanText = styled.span`
  font-family: "Jaldi";
  font-size: 18px;
  font-weight: bold;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const StyledSpanGoldText = styled(StyledSpanText)`
  text-shadow: 1px 0.5px 0.5px #c7a440;
  color: #7e6829;
`;

export const StyledChatTextRight = styled(StyledText)`
  color: #7e6829;
`;

export const StyleChatTextRightRight = styled(StyledChatTextRight)`
  text-align: end;
`;

export const StyleChatTextLeft = styled(StyledText)`
  color: #9f2033;
`;

export const StyleChatTextLeftRight = styled(StyleChatTextLeft)`
  text-align: end;
`;

export const StyledChatText = styled(StyledText)`
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const StyledTextBoldDate = styled(StyledText)`
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 10px;
  text-align: right;
  width: 95%;

  @media (min-width: 540px) {
    width: 100%;
    margin-top: 18px;
    margin-bottom: 18px;
    margin-left: 0px;
  }
`;

export const StyledTextHidden = styled(StyledText) `
    display: none;
  
  @media (min-width: 760px) {
    display: block;
  }
`