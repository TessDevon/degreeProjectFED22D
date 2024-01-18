import styled from "styled-components";


export const StyledText = styled.p ` 
    font-family: "Jaldi";
    font-size: 18px;

    @media (min-width: 1024px) {
        font-size:20px;
    }
`;

export const StyledTextBold = styled(StyledText) ` 
    font-weight: bold;
`;

export const FooterText = styled(StyledText) `
    text-shadow: 1px 1px 1px #7e6829;
    font-size: 18px;
    margin: 0px 15px;
    text-align: end;
`;

export const StyledTextGold = styled(StyledTextBold) `
text-shadow: 1px 0.5px 0.5px #7e6829;
color: #C7A440;

`