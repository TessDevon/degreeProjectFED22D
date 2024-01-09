import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export const Navigation = () => {
  const { t } = useTranslation();

  function Logout() {
    localStorage.removeItem("userIdLocalStorage")
    window. location. reload();
  }
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="headerLink">
            <Link className="Link" to="/">
                {t('navigationInspirationText')}
            </Link>
          </li>
          <li className="headerLink">
            <Link className="Link" to="/Selling">
                {t('navigationBuySellText')}
            </Link>
          </li>
          <li className="headerLink">
            <Link className="Link" to="/About">
                {t('navigationAboutText')}
            </Link>
          </li>
        </ul>
        <p onClick={Logout}> 
          {t('navigationLogoutText')}
        </p>
      </nav>
    </>
  );
};