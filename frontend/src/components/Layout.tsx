import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StyledH1 } from "./styled/Headers";
import {
  HeaderWrapper,
  HeaderWrapperInner,
  Wrapper,
  WrapperFooter,
  WrapperOuter,
} from "./styled/Wrappers";
import { StyledHeaderImg } from "./styled/Image";
import headerimg from "../assets/headerimg.jpg";
import { FooterText } from "./styled/Text";
import Burger from "./Burger";

export const Layout = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <WrapperOuter>
        <header>
          <HeaderWrapper>
            <HeaderWrapperInner>
              <StyledH1>{t("appName")}</StyledH1>
              <StyledHeaderImg width={160} height={75} src={headerimg} />
            </HeaderWrapperInner>
            <Burger></Burger>
          </HeaderWrapper>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer>
          <WrapperFooter>
            <FooterText className="footerText">{t("authertext")}</FooterText>
          </WrapperFooter>
        </footer>
      </WrapperOuter>
    </Wrapper>
  );
};
