import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useTranslation } from "react-i18next";
import { StyledH1 } from "./styled/Headers";
import { HeaderWrapper, HeaderWrapperInner, Wrapper, WrapperFooter, WrapperbodyInner } from "./styled/Wrappers";
import { StyledHeaderImg } from "./styled/Image";
import exempelbild1  from "../assets/exempelbild1.jpg"
import { FooterText } from "./styled/Text";


export const Layout = () => {  
  const { t } = useTranslation();
  return (
    <Wrapper>
      <WrapperbodyInner>
        <header>
          <HeaderWrapper>
            <HeaderWrapperInner>
              <StyledH1>{t('appName')}</StyledH1>
              <StyledHeaderImg width={120} height={75} src={exempelbild1}/>
            </HeaderWrapperInner>
            <Navigation></Navigation>
          </HeaderWrapper>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer>
          <WrapperFooter>
            <FooterText className="footerText">{t('authertext')}</FooterText>
          </WrapperFooter>
        </footer>
      </WrapperbodyInner>
    </Wrapper>
  );
}