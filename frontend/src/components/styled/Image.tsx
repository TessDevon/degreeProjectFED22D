import styled from "styled-components";

export const StyledHeaderImg = styled.img `
    margin-top: 15px;
    margin-left: 5%;
    border-radius: 20px;
    border: 1 solid #C7A440;
    box-shadow: 5px 5px 5px #C7A440;
    width: 90px;
    height: 50px;
    display: none;
    
    @media (min-width: 541px) {
        display: block;
        margin-top: 3px;
    }

    @media (min-width: 768px) {
        margin-top: 5px;
        width: 90px;
        height: 50px;
    }

    @media (min-width: 1024px) {
        display: block;
        width: 90px;
        height: 50px;
        //margin-top: 5px;
    }

    @media (min-width: 1170px) {
      width: 140px;
      height: 60px;
      margin-top: 5px;
    }

    @media (min-width: 1410px) {
        width: 160px;
        height: 75px;
        margin-top: 10px;
    }

`;