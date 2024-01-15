import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StyleNav, StyleNavLi, StyleNavP, StyledNavUl } from "./styled/Navigation";


export const Navigation = () => {
  const { t } = useTranslation();

  function Logout() {
    localStorage.removeItem("userIdLocalStorage")
    window. location. reload();
  }
  return (
    <>
      <StyleNav>
        <StyledNavUl className="nav">
          <StyleNavLi className="headerLink">
            <Link style={{textDecoration:'none', color: 'black'}} className="Link" to="/">
                {t('navigationInspirationText')}
            </Link>
          </StyleNavLi>
          <StyleNavLi className="headerLink">
            <Link style={{textDecoration:'none', color: 'black'}} className="Link" to="/Selling">
                {t('navigationBuySellText')}
            </Link>
          </StyleNavLi>
          <StyleNavLi className="headerLink">
            <Link style={{textDecoration:'none', color: 'black'}} className="Link" to="/About">
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