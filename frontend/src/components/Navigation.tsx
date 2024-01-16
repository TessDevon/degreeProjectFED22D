import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyleNav = styled.nav `
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top:8px;
    right: 8px;
    margin-bottom: -10px;
    background-color: white;
    border: 2px solid #C7A440;
    transition: transform 0.3s ease-in-out;

    @media (min-width: 863px) {
        display: flex;
        transform: none;
        flex-direction: row;
        background-color: transparent;
        border: 0px;
        margin-top: 20px;
        margin-bottom: 0px;
    }
`;

const StyledNavUl = styled.ul `
    display: flex;
    flex-direction: column;
    list-style-type: none;

    @media (min-width: 863px) {
        flex-direction: row;
        margin-top: 20px;
        margin-left: 20px;
    }
`;

const StyleNavLi = styled.li `
    font-family: 'Antic Didone';
    font-size: 18px;
    text-shadow: 1px 1px 2px #7e6829;
    margin:20px;
    margin-left:0px;
    border-bottom: 1px solid #C7A440;
    
    @media (min-width: 863px) {
        margin:0;
        margin-right: 30px;    
        border-bottom: 0px;
    }

    @media (min-width: 1410px) {
        font-size: 20px;
        margin-right: 50px;
    }
`;

const StyleNavP = styled.p `
    margin-left: 40px;
    margin-right: 30px;
    font-family: 'Antic Didone';
    font-size: 18px;
    text-shadow: 1px 1px 1px #7e6829;
    border-bottom: 1px solid #C7A440;
    &:hover{
        cursor: pointer;
    }
    @media (min-width: 863px) {
        margin-left: 0px;
        border-bottom: 0px;
    }
    @media (min-width: 1410px) {
        font-size: 20px;
        margin-right: 50px;
    }
`;


interface IOpenProps {
  open: boolean;

  closeBurgerClickNav: () => void;
 }

const Navigation = ({open, closeBurgerClickNav}:IOpenProps) => {
  const { t } = useTranslation();

  function Logout() {
    localStorage.removeItem("userIdLocalStorage")
    window. location. reload();
    closeBurgerClickNav();
  }

return (
    <>
      <StyleNav open={open}>
        <StyledNavUl className="nav">
          <StyleNavLi className="headerLink" onClick={closeBurgerClickNav}>
            <Link style={{textDecoration:'none', color: 'black'}} className="Link" to="/" >
                {t('navigationInspirationText')}
            </Link>
          </StyleNavLi>
          <StyleNavLi className="headerLink" onClick={closeBurgerClickNav}>
            <Link style={{textDecoration:'none', color: 'black'}} className="Link" to="/Selling" >
                {t('navigationBuySellText')}
            </Link>
          </StyleNavLi>
          <StyleNavLi className="headerLink" onClick={closeBurgerClickNav}>
            <Link style={{textDecoration:'none', color: 'black'}} className="Link" to="/About" >
                {t('navigationAboutText')}
            </Link>
          </StyleNavLi>
        </StyledNavUl>
        <StyleNavP> {t('navigationChatText')}</StyleNavP> 
        <StyleNavP onClick={Logout}> 
          {t('navigationLogoutText')}
        </StyleNavP>
      </StyleNav>
    </>
  );
};
export default Navigation