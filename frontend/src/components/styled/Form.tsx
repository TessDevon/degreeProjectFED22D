import styled from "styled-components";

export const StyledForm = styled.form `
    display: flex;
`;

export const WrapperInputsTwoColum = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const StyledTextInput = styled.input ` 
    font-size: 24px;
    display: block;
    margin-bottom: 3%;
    width: 50%;
`;

export const StyledTextInputComment = styled.input `
    font-size: 24px;
    display: inline;
    margin-bottom: 3%;
    width: 50%;
`;

export const StyledRadioInput = styled.input `
    font-size: 24px;
    margin-bottom: 3%;
`;

export const StyledTextInputHoleRow = styled(StyledTextInput)`
    width: 80%;
`;

export const StyledLabelText = styled.label `
    font-family: "Jaldi";
    font-size: 18px;
    display: block;

    @media (min-width: 1024px) {
        font-size:20px;
    }
`;

export const StyledsScaleText = styled.p ` 
    font-family: "Jaldi";
    font-size: 18px;
    margin-bottom: 0px;

    @media (min-width: 1024px) {
        font-size:20px;
    }
`;
//export const StyledScaleNumber = styled.input ``;