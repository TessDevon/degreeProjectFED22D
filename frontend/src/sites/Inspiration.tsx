import LoginModal from "../components/LoginModal";
import { useTranslation } from "react-i18next";
import { StyledH2, StyledH3 } from "../components/styled/Headers";
import {
  StyledText,
  StyledTextBold,
  StyledTextGold,
} from "../components/styled/Text";
import {
  WrapperBody,
  WrapperComment,
  WrapperInspirationRightInnerView,
  WrapperPost,
  WrapperRow,
  WrapperRowSpaceBetween,
  WrapperUserview,
  WrapperbodyInnerLeftInspiration,
  WrapperbodyInnerRightInspiration,
  WrapperbodyOuter,
} from "../components/styled/Wrappers";
import { StyledTextInput } from "../components/styled/Form";
import { StyledButtonInspirationviewComment } from "../components/styled/Buttons";
import { ErrorMassage } from "../components/styled/ErrorMassage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { InspirationPost, ShowInspirationPost } from "../models/InspirationPosts";
import { fetchInspirationPostData, saveInspirationPostData } from "../services/InsparationPostServices";
import headerimg from "../assets/headerimg.jpg";
import {
  StyledDeliteItem,
  StyledInspirationPostImg,
  StyledUserImg,
} from "../components/styled/Image";
import userimg from "../assets/userImg.jpg";
import userimg2 from "../assets/userImg2.jpg";
import trashIcon from "../assets/trashIcon.svg";
import { ScaleCalculator } from "../components/ScaleCalculator";
import { ShowPersons } from "../models/PersonClass";
import { fetchPersonsData } from "../services/UserServices";

export const Inspiration = () => {
  const { t } = useTranslation();
  const [errorInspirationPostMessage, seterrorInspirationPostMessage] =
    useState("");
  //const [errorRegisterMessage, seterrorRegisterMessage] = useState("");
  const checkPostText = new RegExp(/^[a-zA-ZåäöÅÄÖ ,.'-]+$/i);
  const checkPostImg = new RegExp(/.*\.(jpe?g|png|jpg)$/i);
  const inspirationPostErrorName = t("inspirationPostErrorName");
  const inspirationPostErrorImg = t("inspirationPostErrorImg");
  const inspirationPostErrorServererror = t("inspirationPostErrorServererror");
  const [formData, setFormData] = useState<InspirationPost>({
    inspirationPostHeader: "",
    inspirationPostDescription: "",
    inspirationPostImg: undefined,
  });

  //Hämta användarID och token från localstorage:
  /*useEffect(() => {
    const userLocalstorage = JSON.parse(localStorage.getItem("userIdLocalStorage")|""); 
    if (userLocalstorage) {
      setFormData({...formData, userID: userLocalstorage.id, token: userLocalstorage.token })
    }
  })*/

  //const[deleteIcon, setDeliteIcon] = useState(true) //För att styra radera utifrån anvID.
const [showPosts, setShowPost] = useState<ShowInspirationPost>([]);
const [showUsers, setShowUsers] = useState<ShowPersons>([]);



useEffect( () => {

  const fetchPostFunction = async () => {
  let id = "";
  let token = "";

  const userLocalstorage = JSON.parse(
    localStorage.getItem("userIdLocalStorage") || ""
  );

  if(userLocalstorage) {
    id = userLocalstorage.id;
    token = userLocalstorage.token;
  }

  setShowPost(await fetchInspirationPostData (id, token));
  setShowUsers(await fetchPersonsData (id, token));
}
if(showPosts.length == 0) fetchPostFunction()
    
}, [showPosts,showUsers])

console.log(showUsers)

  


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setFormData({ ...formData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setFormData({ ...formData, [name]: +e.target.value });
    }
    if (e.target.type === "file" && e.target.files != null) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    let id = "";
    let token = "";


    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }

    if (checkPostText.test(formData.inspirationPostHeader)) {
      if (checkPostText.test(formData.inspirationPostDescription)) {
        if (
          formData.inspirationPostImg != undefined &&
          checkPostImg.test(formData.inspirationPostImg?.name)
        ) {
          saveInspirationPostData(
            formData.inspirationPostHeader,
            formData.inspirationPostDescription,
            formData.inspirationPostImg,
            id,
            token
          ).then((ok) => {
            if (ok) {
              seterrorInspirationPostMessage("");
              setFormData({
                inspirationPostHeader: "",
                inspirationPostDescription: "",
                inspirationPostImg: undefined,
              });
            } else {
              seterrorInspirationPostMessage(inspirationPostErrorServererror);
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
    console.log(FormData);
  };

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("inspirationheaderH2")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            <div>
              <StyledH3>{t("inspirationheaderPost")}</StyledH3>
              <div>
                {showPosts.map((post:ShowInspirationPost) => (
                  <WrapperPost key={post.inspirationPostID}>
                  <WrapperRowSpaceBetween>
                  {showUsers.filter((user) => user.userID == post.inspirationPostUserID).map((user:ShowPersons) => 
                    <WrapperUserview>
                      <StyledUserImg width={70} height={70} src={`http://localhost:3000/upload/${user.userImg}`} />
                      <StyledTextBold>{user.userFirstname} {user.userLastname}</StyledTextBold>
                    </WrapperUserview>)}
                    <WrapperRow>
                      <StyledDeliteItem
                        width={30}
                        height={30}
                        src={trashIcon}
                      />
                      <StyledTextBold>{post.inspirationPostDate}</StyledTextBold>
                    </WrapperRow>
                  </WrapperRowSpaceBetween>
                  <StyledInspirationPostImg
                    width={160}
                    height={75}
                    src={`http://localhost:3000/upload/inspiration/${post.inspirationPostImg}`}
                  />
                  <StyledTextGold>{post.inspirationPostHeader}</StyledTextGold>
                  <StyledText>
                    {post.inspirationPostDescription}
                  </StyledText>
                  <StyledButtonInspirationviewComment>
                    Kommentera
                  </StyledButtonInspirationviewComment>
                  <WrapperComment>
                    <WrapperRowSpaceBetween>
                      <WrapperUserview>
                        <StyledUserImg width={70} height={70} src={userimg2} />
                        <StyledTextBold>Marie</StyledTextBold>
                      </WrapperUserview>
                      <WrapperRow>
                        <StyledDeliteItem
                          width={30}
                          height={30}
                          src={trashIcon}
                        />
                        <StyledTextBold>2024-01-25, 6:35</StyledTextBold>
                      </WrapperRow>
                    </WrapperRowSpaceBetween>
                    <StyledText>
                      Så mysigt. Den restaurangen hade jag veltat besöka.{" "}
                    </StyledText>
                  </WrapperComment>
                  <WrapperComment>
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
                        <StyledTextBold>2024-01-25, 7:35</StyledTextBold>
                      </WrapperRow>
                    </WrapperRowSpaceBetween>
                    <StyledText>
                      Tack för de fina orden. Du är så välkommen!
                    </StyledText>
                  </WrapperComment>
                </WrapperPost>

                ))}
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
                    src={headerimg}
                  />
                  <StyledTextGold>Mitt viktorianska hem</StyledTextGold>
                  <StyledText>
                    I detta hem har jag tapetserat om i en härlig röd tapet.
                    Träpanel är av tjockare papp. Många fina miniatyrer som jag
                    köpt på denna sidan blir pringen över iet.
                  </StyledText>
                  <StyledButtonInspirationviewComment>
                    Kommentera
                  </StyledButtonInspirationviewComment>
                  <WrapperComment>
                    <WrapperRowSpaceBetween>
                      <WrapperUserview>
                        <StyledUserImg width={70} height={70} src={userimg2} />
                        <StyledTextBold>Marie</StyledTextBold>
                      </WrapperUserview>
                      <WrapperRow>
                        <StyledDeliteItem
                          width={30}
                          height={30}
                          src={trashIcon}
                        />
                        <StyledTextBold>2024-01-25, 6:35</StyledTextBold>
                      </WrapperRow>
                    </WrapperRowSpaceBetween>
                    <StyledText>
                      Så mysigt. Den restaurangen hade jag veltat besöka.{" "}
                    </StyledText>
                  </WrapperComment>
                  <WrapperComment>
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
                        <StyledTextBold>2024-01-25, 7:35</StyledTextBold>
                      </WrapperRow>
                    </WrapperRowSpaceBetween>
                    <StyledText>
                      Tack för de fina orden. Du är så välkommen!
                    </StyledText>
                  </WrapperComment>
                </WrapperPost>
              </div>
            </div>
          </WrapperbodyInnerLeftInspiration>

          <WrapperbodyInnerRightInspiration>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("inspriationheaderAdd")}</StyledH3>
              <StyledText> {t("inspirationPostText")}</StyledText>
              <ErrorMassage>{errorInspirationPostMessage}</ErrorMassage>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <StyledText>{t("inspirationPostHeaderText")}</StyledText>
                    <StyledTextInput
                      value={formData.inspirationPostHeader}
                      type="text"
                      onChange={handleChange}
                      name="inspirationPostHeader"
                    />
                  </div>
                  <div>
                    <StyledText>
                      {t("inspirationPostDescriptionText")}
                    </StyledText>
                    <StyledTextInput
                      value={formData.inspirationPostDescription}
                      type="text"
                      onChange={handleChange}
                      name="inspirationPostDescription"
                    />
                  </div>

                  <div>
                    <StyledText>{t("inspirationPostImg")}</StyledText>
                    <StyledTextInput
                      type="file"
                      onChange={handleChange}
                      name="inspirationPostImg"
                    />
                  </div>
                </div>
                <StyledButtonInspirationviewComment>
                  {t("inspirationAddPostBtnText")}
                </StyledButtonInspirationviewComment>
              </form>
            </WrapperInspirationRightInnerView>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("inspirationheaderScale")}</StyledH3>
              <ScaleCalculator />
            </WrapperInspirationRightInnerView>
          </WrapperbodyInnerRightInspiration>
        </WrapperbodyOuter>
      </WrapperBody>
      <LoginModal></LoginModal>
    </>
  );
};
