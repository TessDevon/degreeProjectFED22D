import styled from "styled-components";

///////////////////////////////////////////////////
//////////////// Generell /////////////////////////
///////////////////////////////////////////////////

export const Wrapper = styled.div` 
    background-color: #9f2033;
    width: 100%;
`
export const HeaderWrapper = styled.div `
    border-width: 2px;
    border:1px #c7a440 solid; 
    box-shadow: 0px 3px 5px #C7A440;
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

export const WrapperRow = styled.div `
    display: flex;
    flex-direction: row;
    
`;



export const WrapperRowSpaceBetween = styled(WrapperRow) `
    justify-content: space-between;
`;

export const WrapperPost = styled.article `
    border: 1px #C7A440 solid;
    box-shadow: 3px 3px 3px #C7A440;
    border-radius: 10px;
    padding: 3%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const WrapperComment = styled.div `
    border-left: 1px #C7A440 solid;
    border-top: 1px #C7A440 solid;
    border-top-left-radius: 15px;
    padding-left: 2%;
    margin-top: 20px;

`;

///////////////////////////////////////////////////
//////////////// Specifik /////////////////////////
///////////////////////////////////////////////////

export const HeaderWrapperInner = styled.div `
    display: flex;
    flex-direction: row;
    width:75%;

    @media (min-width: 863px) {
        width: 50%;
    }
`;

export const WrapperbodyInnerLeftAbout = styled.section `
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    
    @media (min-width: 1024px) {
        width: 70%;
        margin-bottom: 3%;
    }    
`

export const WrapperbodyInnerRightAbout = styled.section ` 
    border: 1px solid #C7A440;
    //box-shadow: 5px -5px 5px #C7A440;
    padding:15px;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 5%;
    width: 85%;
    box-shadow: 3px 3px 3px #C7A440;
    border-bottom-right-radius: 15px;
    /*border-right: 1px #C7A440 solid;
    border-bottom: 1px #C7A440 solid;
    
    
    margin-top:5%;
    margin-bottom: 5%;
    padding: 15px;
*/
    @media (min-width: 1024px) {
        width: 20%;
        margin-bottom: 3%;
    }
`


export const WrapperbodyInnerLeftInspiration = styled.section `
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    
    
    @media (min-width: 1024px) {
        width: 60%;
    }    
`

export const WrapperbodyInnerRightInspiration = styled.section ` 
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 5%;
    width: 90%;
    

    @media (min-width: 1024px) {
        width: 30%;
        margin-bottom: 0%;
        padding-left: 5%;
        margin-left: 0px;
        border-left: 1px solid #C7A440;
        
    }
`

export const WrapperUserview = styled(WrapperRow) `
    width: 45%;
`;

export const WrapperInspirationRightInnerView = styled.article `
    border-right: 1px #C7A440 solid;
    border-bottom: 1px #C7A440 solid;
    box-shadow: 3px 3px 3px #C7A440;
    border-bottom-right-radius: 15px;
    margin-top:5%;
    margin-bottom: 5%;
    padding: 15px;
    
`;


export const WrapperFooter = styled.div `
    border: 1px #C7A440 solid;
    box-shadow: 0px -2px 5px #C7A440;
`;