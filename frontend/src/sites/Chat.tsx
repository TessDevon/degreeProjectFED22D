import { StyledH2, StyledH3 } from "../components/styled/Headers";
import { useTranslation } from "react-i18next";
import {
  WrapperBody,
  WrapperInspirationRightInnerView,
  WrapperPost,
  WrapperbodyInnerLeftInspiration,
  WrapperbodyInnerRightInspiration,
  WrapperbodyOuter,
} from "../components/styled/Wrappers";
import { StyledText } from "../components/styled/Text";

export const Chat = () => {
  const { t } = useTranslation();

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("chatH3")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            <WrapperPost>
              <StyledH3>{t("chatHeaderText")}</StyledH3>
            </WrapperPost>
          </WrapperbodyInnerLeftInspiration>
          <WrapperbodyInnerRightInspiration>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("chatHeaderFormText")}</StyledH3>
            </WrapperInspirationRightInnerView>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("chatHeaderChatInfoText")}</StyledH3>
              <StyledText>{t("chatInfoText")}</StyledText>
            </WrapperInspirationRightInnerView>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("chatHeaderUserText")}</StyledH3>
            </WrapperInspirationRightInnerView>
          </WrapperbodyInnerRightInspiration>
        </WrapperbodyOuter>
      </WrapperBody>
    </>
  );
};
