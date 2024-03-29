import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
`;

export const WrapperInputsTwoColum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 760px) {
    flex-direction: row;
  }
`;

export const StyledTextInput = styled.input`
  width: 80%;
  font-size: 16px;
  display: block;
  margin-bottom: 3%;
  @media (min-width: 760px) {
    width: 50%;
    font-size: 18px;
  }
`;

export const StyledTextInputComment = styled.input`
  font-size: 18px;
  height: 30px;
  display: inline;
  margin-bottom: 3%;
  width: 100%;

  @media (min-width: 540px) {
    width: 50%;
  }
`;

export const StyledRadioInput = styled.input`
  font-size: 24px;
  margin-bottom: 3%;
`;

export const StyledTextInputHoleRow = styled(StyledTextInputComment)`
  width: 80%;
`;

export const StyledLabelText = styled.label`
  font-family: "Jaldi";
  font-size: 18px;
  display: block;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const StyledsScaleText = styled.p`
  font-family: "Jaldi";
  font-size: 18px;
  margin-bottom: 0px;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;
