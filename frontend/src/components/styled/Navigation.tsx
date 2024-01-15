import styled from "styled-components";

export const StyleNav = styled.nav `
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;

export const StyledNavUl = styled.ul `
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin-top: 20px;
    
`;

export const StyleNavLi = styled.li `
    margin-right: 50px;
    font-family: 'Antic Didone';
    font-size: 20px;
    text-shadow: 1px 1px 2px #7e6829;
`;

export const StyleNavP = styled.p `
    margin-right: 50px;
    font-family: 'Antic Didone';
    font-size: 20px;
    text-shadow: 1px 1px 1px #7e6829;
    &:hover{
        cursor: pointer;
    }
`;

