import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useTranslation } from "react-i18next";


export const Layout = () => {  
  const { t } = useTranslation();
  return (
    <>
      <header>
        <h1>{t('appName')}</h1>
        <Navigation></Navigation>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p className="footerText">{t('authertext')}</p>
      </footer>
    </>
  );
}