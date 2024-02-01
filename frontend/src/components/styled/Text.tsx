import styled from "styled-components";

export const StyledText = styled.p`
  font-family: "Jaldi";
  font-size: 18px;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const StyleTextBlock = styled(StyledText)`
  display: block;
`

export const StyledTextFlow = styled(StyledText)`
  float: inline-end;
`

export const StyledTextBold = styled(StyledText)`
  font-weight: bold;
`;

export const StyledTextBlock = styled(StyledText) `
  display: block;
`

export const FooterText = styled(StyledText)`
  text-shadow: 1px 1px 1px #7e6829;
  font-size: 18px;
  margin: 0px 15px;
  text-align: end;
`;

export const StyledTextGold = styled(StyledTextBold)`
  text-shadow: 1px 0.5px 0.5px #7e6829;
  color: #c7a440;
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
  text-shadow: 1px 0.5px 0.5px #7e6829;
  color: #c7a440;
`;

export const StyledChatTextRight = styled(StyledText) `
  color: #c7a440;
`

export const StyleChatTextRightRight = styled(StyledChatTextRight)`
  text-align: end;
`

export const StyleChatTextLeft = styled(StyledText) `
  color: #9f2033;
`

export const StyleChatTextLeftRight = styled(StyleChatTextLeft)`
  text-align: end;
`

export const StyledChatText = styled(StyledText) `
  margin-top: 0px;
  margin-bottom: 0px;
`
