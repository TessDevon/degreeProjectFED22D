import styled from "styled-components";


export const StyledButton = styled.button `
    font-size: 20px;
    font-family: 'Jaldi';
    padding-left: 15px;
    padding-right: 15px;
`;


export const StyledButtonRightsided = styled(StyledButton) `
    position: relative;
    left:90%
`

export const StyledButtonCenter = styled(StyledButton) `
    position: relative;
    left:40%;
`

export const StyledButtonInspirationviewComment = styled(StyledButtonRightsided) `
    left:80%;
`;



