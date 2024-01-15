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

export const StyledTextInputHoleRow = styled(StyledTextInput)`
    width: 80%;
`;