import LoginModal from "../components/LoginModal";
import { useTranslation } from "react-i18next";
import { StyledH2, StyledH3 } from "../components/styled/Headers";
import { StyledText, StyledTextBold } from "../components/styled/Text";
import {
  WrapperBody,
  WrapperbodyInnerLeftAbout,
  WrapperbodyInnerRightAbout,
  WrapperbodyOuter,
} from "../components/styled/Wrappers";

export const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <WrapperBody>
        <StyledH2>{t("aboutheaderH2")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftAbout>
            <div>
              <StyledH3>{t("aboutheaderH3")}</StyledH3>
              <StyledText>{t("abouttext1")}</StyledText>
              <StyledText>{t("abouttext2")}</StyledText>
              <StyledText>{t("abouttext3")}</StyledText>
              <StyledTextBold>{t("abouttext4")}</StyledTextBold>
            </div>
            <div>
              <StyledH3>{t("abouttextRuleH3")}</StyledH3>
              <StyledText>{t("abouttextRule1")}</StyledText>
              <StyledText>{t("abouttextRule2")}</StyledText>
              <StyledText>{t("abouttextRule3")}</StyledText>
              <StyledText>{t("abouttextRule4")}</StyledText>
              <StyledText>{t("abouttextRule5")}</StyledText>
              <StyledText>{t("abouttextRule6")}</StyledText>
              <StyledText>{t("abouttextRule7")}</StyledText>
              <StyledText>{t("abouttextRule8")}</StyledText>
              <StyledText>{t("abouttextRule9")}</StyledText>
            </div>
          </WrapperbodyInnerLeftAbout>
          <WrapperbodyInnerRightAbout>
            <StyledH3>{t("aboutEventH3")}</StyledH3>
            <StyledTextBold>{t("aboutEvent1")}</StyledTextBold>
            <StyledText>{t("aboutEvent1Date")}</StyledText>
            <StyledText>{t("aboutEvent1Time")}</StyledText>
            <StyledText>{t("aboutEvent1Place")}</StyledText>
            <StyledTextBold>{t("aboutEvent2")}</StyledTextBold>
            <StyledText>{t("aboutEvent2Date")}</StyledText>
            <StyledText>{t("aboutEvent2Time")}</StyledText>
            <StyledText>{t("aboutEvent2Place")}</StyledText>
          </WrapperbodyInnerRightAbout>
        </WrapperbodyOuter>
      </WrapperBody>
      <LoginModal></LoginModal>
    </>
  );
};
