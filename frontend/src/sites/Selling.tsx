import LoginModal from "../components/LoginModal";
import { StyledButtonInspirationviewComment } from "../components/styled/Buttons";
import { ErrorMassage } from "../components/styled/ErrorMassage";
import { StyledTextInput } from "../components/styled/Form";
import { StyledH2, StyledH3 } from "../components/styled/Headers";
import {
  StyledDeliteItem,
  StyledInspirationPostImg,
  StyledUserImg,
} from "../components/styled/Image";
import {
  StyledText,
  StyledTextBold,
  StyledTextGold,
} from "../components/styled/Text";
import {
  WrapperBody,
  WrapperCommentBuy,
  WrapperInspirationRightInnerView,
  WrapperItemComment,
  WrapperPost,
  WrapperRow,
  WrapperRowSpaceBetween,
  WrapperUserview,
  WrapperbodyInnerLeftInspiration,
  WrapperbodyInnerRightInspiration,
  WrapperbodyOuter,
} from "../components/styled/Wrappers";
import { useTranslation } from "react-i18next";
import trashIcon from "../assets/trashIcon.svg";
import sellImg from "../assets/sellImg.jpg";
import sellImgfirst from "../assets/sellImgfirst.jpg";
import userimg from "../assets/userImg.jpg";
import userimg2 from "../assets/userImg2.jpg";
import { ChangeEvent, FormEvent, useState } from "react";
import { saveSellPostData } from "../services/SellPostServices";
import { sellPost } from "../models/SellPosts";
//import { Wrapperbody } from "../components/styled/Wrappers";

export const Selling = () => {
  const { t } = useTranslation();
  const [errorInspirationPostMessage, seterrorInspirationPostMessage] =
    useState("");
  //const [errorRegisterMessage, seterrorRegisterMessage] = useState("");
  const checkPostText = new RegExp(/^[a-zA-ZåäöÅÄÖ ,.'-]+$/i);
  const checkPostImg = new RegExp(/\.(jpe?g|png|gif|bmp)$/i);
  const inspirationPostErrorName = t("inspirationPostErrorName");
  const inspirationPostErrorImg = t("inspirationPostErrorImg");
  const inspirationPostErrorServererror = t("inspirationPostErrorServererror");
  const [formData, setFormData] = useState<sellPost>({
    sellPostHeader: "",
    sellPostDescription: "",
    sellPostImg: "",
  });

  //const[deleteIcon, setDeliteIcon] = useState(true) För att styra radera utifrån anvID.

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setFormData({ ...formData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setFormData({ ...formData, [name]: +e.target.value });
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    if (checkPostText.test(formData.sellPostHeader)) {
      if (checkPostText.test(formData.sellPostDescription)) {
        if (checkPostImg.test(formData.sellPostImg)) {
          saveSellPostData(
            formData.sellPostHeader,
            formData.sellPostDescription,
            formData.sellPostImg
          ).then((ok) => {
            if (ok) {
              seterrorInspirationPostMessage("");
            } else {
              seterrorInspirationPostMessage(inspirationPostErrorServererror);
              setFormData({
                sellPostHeader: "",
                sellPostDescription: "",
                sellPostImg: "",
              });
            }
          });
        } else {
          seterrorInspirationPostMessage(inspirationPostErrorImg);
        }
      } else {
        seterrorInspirationPostMessage(inspirationPostErrorName);
      }
    } else {
      seterrorInspirationPostMessage(inspirationPostErrorName);
    }
  };

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("sellviewHeaderH2")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            <div>
              <StyledH3>{t("sellviewHeaderPost")}</StyledH3>
              <div>
                <WrapperPost>
                  <WrapperRowSpaceBetween>
                    <WrapperUserview>
                      <StyledUserImg width={70} height={70} src={userimg} />
                      <StyledTextBold>Anna-Lena</StyledTextBold>
                    </WrapperUserview>
                    <WrapperRow>
                      <StyledDeliteItem
                        width={30}
                        height={30}
                        src={trashIcon}
                      />
                      <StyledTextBold>2024-01-25, 6:25</StyledTextBold>
                    </WrapperRow>
                  </WrapperRowSpaceBetween>
                  <StyledInspirationPostImg
                    width={160}
                    height={75}
                    src={sellImgfirst}
                  />
                  <StyledTextGold>Hjul till köksvagn</StyledTextGold>
                  <StyledText>
                    Säljer egentillverkade hjul till sylvaniavagn. Tillverkade i
                    PLA-plats. Finns fler färger. Porto tillkommer
                  </StyledText>
                  <StyledButtonInspirationviewComment>
                    Kommentera
                  </StyledButtonInspirationviewComment>
                  <WrapperItemComment>
                    <WrapperRowSpaceBetween>
                      <WrapperUserview>
                        <StyledUserImg width={70} height={70} src={userimg} />
                        <StyledTextBold>Anna-Lena</StyledTextBold>
                      </WrapperUserview>
                      <WrapperRow>
                        <StyledDeliteItem
                          width={30}
                          height={30}
                          src={trashIcon}
                        />
                        <StyledTextBold>2024-01-25, 6:25</StyledTextBold>
                      </WrapperRow>
                    </WrapperRowSpaceBetween>
                    <StyledInspirationPostImg
                      width={160}
                      height={75}
                      src={sellImg}
                    />
                    <StyledText>4 svarta hjul. 25kr PP!</StyledText>
                    <StyledButtonInspirationviewComment>
                      Kommentera
                    </StyledButtonInspirationviewComment>
                    <WrapperCommentBuy>
                      <WrapperRowSpaceBetween>
                        <WrapperUserview>
                          <StyledUserImg
                            width={70}
                            height={70}
                            src={userimg2}
                          />
                          <StyledTextBold>Marie</StyledTextBold>
                        </WrapperUserview>
                        <WrapperRow>
                          <StyledDeliteItem
                            width={30}
                            height={30}
                            src={trashIcon}
                          />
                          <StyledTextBold>2024-01-25, 7:35</StyledTextBold>
                        </WrapperRow>
                      </WrapperRowSpaceBetween>
                      <StyledText>Köper!</StyledText>
                    </WrapperCommentBuy>
                  </WrapperItemComment>
                </WrapperPost>
              </div>
            </div>
          </WrapperbodyInnerLeftInspiration>
          <WrapperbodyInnerRightInspiration>
          <WrapperInspirationRightInnerView>
              <StyledH3>{t("sellHeaderRule")}</StyledH3>
              <StyledText>{t("selltextRule")}</StyledText>
            </WrapperInspirationRightInnerView>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("inspriationheaderAdd")}</StyledH3>
              <StyledText> {t("sellPostText")}</StyledText>
              <ErrorMassage>{errorInspirationPostMessage}</ErrorMassage>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <StyledText>{t("sellPostHeader")}</StyledText>
                    <StyledTextInput
                      value={formData.sellPostHeader}
                      type="text"
                      onChange={handleChange}
                      name="sellPostHeader"
                    />
                  </div>
                  <div>
                    <StyledText>{t("sellPostDescription")}</StyledText>
                    <StyledTextInput
                      value={formData.sellPostDescription}
                      type="text"
                      onChange={handleChange}
                      name="sellPostDescription"
                    />
                  </div>

                  <div>
                    <StyledText>{t("sellPostImg")}</StyledText>
                    <StyledTextInput
                      value={formData.sellPostImg}
                      type="text"
                      onChange={handleChange}
                      name="sellPostImg"
                    />
                  </div>
                </div>
                <StyledButtonInspirationviewComment>
                  {t("inspirationAddPostBtnText")}
                </StyledButtonInspirationviewComment>
              </form>
            </WrapperInspirationRightInnerView>
            
          </WrapperbodyInnerRightInspiration>
        </WrapperbodyOuter>
      </WrapperBody>
      <LoginModal></LoginModal>
    </>
  );
};
