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

export const StyledInspirationPostImg = styled.img `
    margin-top: 15px;
    margin-left: 1%;
    border-radius: 5px;
    border: 1 solid #C7A440;
    box-shadow: 2px 2px 2px #C7A440;
    width: 450px;
    height: 240px;
    //display: none;
`;

export const StyledInspirationCommentImg = styled(StyledInspirationPostImg) `
    width: 350;
    height: 180;
`;

export const StyledUserImg = styled.img `
    margin-top: 15px;
    margin-left: 5%;
    border-radius: 5px;
    //border: 1 solid #C7A440;
    //box-shadow: 5px 5px 5px #C7A440;
    width: 50px;
    height: 50px;
    margin-right: 20px;
    //display: none;
`;

export const StyledDeliteItem = styled.img `
    //margin-right: 20px;
    padding: 18px;
`;