import styled from "styled-components";

///////////////////////////////////////////////////
//////////////// Generell /////////////////////////
///////////////////////////////////////////////////

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

export const WrapperOuter = styled.div `
background-color: white;
width: 95%;
margin-left: 2.5%;
`;

export const WrapperBody = styled.div `
    padding-left: 2.5%;
    padding-right: 2.5%;
`;

export const WrapperbodyOuter = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 1024px) {
        flex-direction: row;
    }
`;


///////////////////////////////////////////////////
//////////////// Specifik /////////////////////////
///////////////////////////////////////////////////
export const HeaderWrapperInner = styled.div `
    display: flex;
    flex-direction: row;
    width: 45%;    
`;

export const WrapperbodyInnerLeftAbout = styled.div `
    margin-left: 5%;
    margin-right: 5%;
    
    @media (min-width: 1024px) {
        width: 70%;
    }    
`

export const WrapperbodyInnerRightAbout = styled.div ` 
    border: 1px solid #C7A440;
    box-shadow: 5px -5px 5px #C7A440;
    padding:15px;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 5%;

    @media (min-width: 1024px) {
        width: 20%;
        margin-bottom: 0%;
    }
`

export const WrapperFooter = styled.div `
    border: 1px #C7A440 solid;
    box-shadow: 0px -5px 5px #C7A440;
`;