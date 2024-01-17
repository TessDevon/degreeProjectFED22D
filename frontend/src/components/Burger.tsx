import styled from 'styled-components';
import { useState } from 'react';
import Navigation from './Navigation';

const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    position: absolute;
    top:30px;
    right: 45px;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 20;

    @media (min-width: 768px) {
        right:45px;
    }

    @media (min-width: 940px) {
        display: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }) => open ? '#ccc' : '#333'};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;

        &:nth-child(1) {
            transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }

        &:nth-child(2) {
            transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ open}) => open ? 0 : 1};
        }

        &:nth-child(3) {
            transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }
`;

const Burger = () => {

    const[open, setOpen] = useState(false)

    function closeBugerClickNav () {
        setOpen(!open)
    }

    return (
        <>
            <StyledBurger open={open} onClick={closeBugerClickNav}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <Navigation open={open} closeBurgerClickNav={closeBugerClickNav}/>
        </>
    )
}
export default Burger