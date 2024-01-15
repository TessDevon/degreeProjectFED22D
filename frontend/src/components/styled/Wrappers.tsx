import styled from "styled-components";

export const Wrapper = styled.div` 
    background-color: #9f2033;
`

export const HeaderWrapper = styled.div `
    border-width: 2px;
    border:1px #c7a440 solid; 
    box-shadow: 0px 5px 3px #C7A440;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderWrapperInner = styled.div `
    display: flex;
    flex-direction: row;
    width: 45%;
    
`;

export const WrapperbodyInner = styled.div `
background-color: white;
width: 95%;
margin-left: 2.5%;
`;

export const WrapperFooter = styled.div `
    border: 1px #C7A440 solid;
    box-shadow: 0px -5px 5px #C7A440;
`;