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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  fetchSellPostData,
  saveSellPostData,
} from "../services/SellPostServices";
import { ShowSellPost, sellPost, sellingPost } from "../models/SellPosts";
import { ShowPersons } from "../models/PersonClass";
import { fetchPersonsData } from "../services/UserServices";
//import { Wrapperbody } from "../components/styled/Wrappers";

export const Selling = () => {
  const { t } = useTranslation();
  const [errorSellingPostMessage, seterrorSellingPostMessage] = useState("");
  //const [errorSellingPostItemMessage, seterrorSellingPostItemMessage,] =
  //useState("");
  //const [errorSellingCommentMessage,seterrorSellingPostCommentMessage,] =
  //useState("");

  //const [errorRegisterMessage, seterrorRegisterMessage] = useState("");
  const checkPostText = new RegExp(/^[a-zA-ZåäöÅÄÖ ,.'-/!]+$/i);
  const checkPostImg = new RegExp(/.*\.(jpe?g|png|jpg)$/i);
  const sellingPostErrorName = t("inspirationPostErrorName");
  const sellingPostErrorImg = t("inspirationPostErrorImg");
  const sellingPostErrorServererror = t("inspirationPostErrorServererror");
  const [formData, setFormData] = useState<sellPost>({
    sellPostHeader: "",
    sellPostDescription: "",
    sellPostImg: undefined,
  });
  /*
  const [formSellItemData, setFormSellItemData] = useState({

  })

  const [formSellData, setformSellData] = useState({
    sellPostCommentDescription: "",
  });
  //const[deleteIcon, setDeliteIcon] = useState(true) För att styra radera utifrån anvID.
*/

  const [showPosts, setShowPost] = useState<ShowSellPost>([]);
  const [showUsers, setShowUsers] = useState<ShowPersons>([]);
  //  const [showItemComments, setShowItemComments] = useState<ShowInspirationPostComment>([]);
  //  const [showComments, setShowComments] = useState<ShowInspirationPostComment>([]);

  useEffect(() => {
    const fetchPostFunction = async () => {
      let id = "";
      let token = "";

      const userLocalstorage = JSON.parse(
        localStorage.getItem("userIdLocalStorage") || ""
      );

      if (userLocalstorage) {
        id = userLocalstorage.id;
        token = userLocalstorage.token;
      }

      setShowPost(await fetchSellPostData(id, token));
      setShowUsers(await fetchPersonsData(id, token));
      //setShowComments(await fetchInspirationPostCommentData(id, token));
    };
    if (showPosts.length == 0) fetchPostFunction();
  }, [showPosts, showUsers /*showComments*/]);

  console.log(showPosts);
  /**/

  //////////////////////////////////////////////////////////////
  ///////////////// Form to add sellPost ///////////////////////
  //////////////////////////////////////////////////////////////

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

    if (checkPostText.test(formData.sellPostHeader)) {
      if (checkPostText.test(formData.sellPostDescription)) {
        if (
          formData.sellPostImg != undefined &&
          checkPostImg.test(formData.sellPostImg?.name)
        ) {
          saveSellPostData(
            formData.sellPostHeader,
            formData.sellPostDescription,
            formData.sellPostImg,
            id,
            token
          ).then((ok) => {
            if (ok) {
              seterrorSellingPostMessage("");
              setFormData({
                sellPostHeader: "",
                sellPostDescription: "",
                sellPostImg: undefined,
              });
            } else {
              seterrorSellingPostMessage(sellingPostErrorServererror);
            }
          });
        } else {
          seterrorSellingPostMessage(sellingPostErrorImg);
        }
      } else {
        seterrorSellingPostMessage(sellingPostErrorName);
      }
    } else {
      seterrorSellingPostMessage(sellingPostErrorName);
    }
    console.log(formData);
  };

  ////////////////////////////////////////////////////////////
  ///////////////////// Form to sell Item ////////////////////
  ////////////////////////////////////////////////////////////

  /*Add code*/

  /////////////////////////////////////////////////////////////
  //////////////////// Form to Comment ////////////////////////
  /////////////////////////////////////////////////////////////
  /*
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setformCommentData({ ...formCommentData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setformCommentData({ ...formCommentData, [name]: +e.target.value });
    }
    if (e.target.type === "file" && e.target.files != null) {
      setformCommentData({ ...formCommentData, [name]: e.target.files[0] });
    }
  };
  const handleCommentSubmit = (e: FormEvent, inspirationPostID: number) => {
    e.preventDefault();
    console.log(formCommentData);

    let id = "";
    let token = "";

    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }

    if (checkPostText.test(formCommentData.inspirationPostCommentDescription)) {
      saveInspirationPostCommentData(
        formCommentData.inspirationPostCommentDescription,
        id,
        token,
        inspirationPostID
      ).then((ok) => {
        if (ok) {
          seterrorInspirationPostMessage("");
          setformCommentData({
            inspirationPostCommentDescription: "",
          });
        } else {
          seterrorInspirationPostCommentMessage(
            inspirationPostErrorServererror
          );
        }
      });
    } else {
      seterrorInspirationPostCommentMessage(inspirationPostErrorName);
    }
    console.log(FormData);
  };
*/

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("sellviewHeaderH2")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            <div>
              <StyledH3>{t("sellviewHeaderPost")}</StyledH3>
              <div>
                {showPosts.map((post: ShowSellPost) => (
                  <WrapperPost key={post.sellingPostID}>
                    <WrapperRowSpaceBetween>
                      {showUsers
                        .filter((user) => user.userID == post.sellingPostUserID)
                        .map((user: ShowPersons) => (
                          <WrapperUserview>
                            <StyledUserImg
                              width={70}
                              height={70}
                              src={`http://localhost:3000/upload/${user.userImg}`}
                            />
                            <StyledTextBold>
                              {user.userFirstname} {user.userLastname}
                            </StyledTextBold>
                          </WrapperUserview>
                        ))}
                      <WrapperRow>
                        <StyledDeliteItem
                          width={30}
                          height={30}
                          src={trashIcon}
                        />
                        <StyledTextBold>{post.sellingPostDate}</StyledTextBold>
                      </WrapperRow>
                    </WrapperRowSpaceBetween>
                    <StyledInspirationPostImg
                      width={160}
                      height={75}
                      src={`http://localhost:3000/upload/selling/${post.sellingPostImg}`}
                    />
                    <StyledTextGold>{post.sellingPostHeader}</StyledTextGold>
                    <StyledText>{post.sellingPostDescription}</StyledText>
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
                ))}
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
              <ErrorMassage>{errorSellingPostMessage}</ErrorMassage>
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
                      //value={formData.sellPostImg}
                      type="file"
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
