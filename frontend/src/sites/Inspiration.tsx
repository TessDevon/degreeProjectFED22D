import LoginModal from "../components/LoginModal";
import { useTranslation } from "react-i18next";
import { StyledH2, StyledH3 } from "../components/styled/Headers";
import {
  StyledText,
  StyledTextBold,
  StyledTextBoldDate,
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
import {
  StyledTextInputComment,
  StyledTextInputHoleRow,
} from "../components/styled/Form";
import { StyledButtonInspirationviewComment } from "../components/styled/Buttons";
import { ErrorMassage, OkMassage } from "../components/styled/ErrorMassage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  InspirationPost,
  ShowInspirationPost,
  ShowInspirationPostComment,
} from "../models/InspirationPosts";
import {
  deleteInspirationPostData,
  fetchInspirationPostData,
  saveInspirationPostData,
} from "../services/InsparationPostServices";

import {
  deleteInspirationPostCommentData,
  fetchInspirationPostCommentData,
  saveInspirationPostCommentData,
} from "../services/InspirationCommentServises";
import {
  StyledDeliteItem,
  StyledInspirationPostImg,
  StyledUserImg,
} from "../components/styled/Image";
import trashIcon from "../assets/trashIcon.svg";
import { ScaleCalculator } from "../components/ScaleCalculator";
import { ShowPersons } from "../models/PersonClass";
import { fetchPersonsData } from "../services/UserServices";
import { useNavigate } from "react-router-dom";

export const Inspiration = () => {
  const { t } = useTranslation();
  const [errorInspirationPostMessage, seterrorInspirationPostMessage] =
    useState("");
  const [
    errorInspirationPostCommentMessage,
    seterrorInspirationPostCommentMessage,
  ] = useState("");
  const [okSellingPostMessage, setOkSellingPostMessage] = useState("");
  const checkPostText = new RegExp(/^[a-zA-ZåäöÅÄÖ0-9 ,.'-/!?:();]+$/i);
  const checkPostImg = new RegExp(/.*\.(jpe?g|png|jpg)$/i);
  const inspirationPostErrorName = t("inspirationPostErrorName");
  const inspirationPostErrorImg = t("inspirationPostErrorImg");
  const inspirationPostErrorServererror = t("inspirationPostErrorServererror");
  const okmessage = t("sellingOkMessage");

  const [formData, setFormData] = useState<InspirationPost>({
    inspirationPostHeader: "",
    inspirationPostDescription: "",
    inspirationPostImg: undefined,
  });
  const [formCommentData, setformCommentData] = useState({
    inspirationPostCommentDescription: "",
  });

  const [showPosts, setShowPost] = useState<ShowInspirationPost[]>([]);
  const [showUsers, setShowUsers] = useState<ShowPersons[]>([]);
  const [showComments, setShowComments] = useState<
    ShowInspirationPostComment[]
  >([]);

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

      setShowPost(await fetchInspirationPostData(id, token));
      setShowUsers(await fetchPersonsData(id, token));
      setShowComments(await fetchInspirationPostCommentData(id, token));
    };
    if (showPosts.length == 0) fetchPostFunction();
  }, [showPosts, showUsers, showComments]);

  // Get userID to check users view.
  function getUser() {
    let id = "";
    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
    }
    return id;
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////// Form to add Post ////////////////////////
  //////////////////////////////////////////////////////////////////////

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

    let id = "";
    let token = "";

    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }

    function okMessage() {
      setOkSellingPostMessage("");
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
              //window.location.reload();
              fetchInspirationPostData(id, token).then((data) => {
                setShowPost(data);
                setOkSellingPostMessage(okmessage);
                setTimeout(okMessage, 3000);
              });
              //Ladda om sidan genom att hämta listan på nytta efter sparning.
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
  };

  const deleteInspirationPost = (deleteInspirationPostId: number) => {
    console.log("Körs");

    let id = "";
    let token = "";

    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }

    deleteInspirationPostData(id, token, deleteInspirationPostId).then(() => {
      fetchInspirationPostData(id, token).then((data) => setShowPost(data));
    });
  };

  //////////////////////////////////////////////////////////////////////
  ///////////////////// Form to add comment ////////////////////////////
  //////////////////////////////////////////////////////////////////////

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
          fetchInspirationPostCommentData(id, token).then((data) =>
            setShowComments(data)
          );
          // Ladda om kommentarerna när man lagt in en ny.
        } else {
          seterrorInspirationPostCommentMessage(
            inspirationPostErrorServererror
          );
        }
      });
    } else {
      seterrorInspirationPostCommentMessage(inspirationPostErrorName);
    }
  };

  const deleteInspirationCommnet = (deleteInspirationPostCommentId: number) => {
    console.log("Körs");

    let id = "";
    let token = "";

    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }

    deleteInspirationPostCommentData(
      id,
      token,
      deleteInspirationPostCommentId
    ).then(() => {
      fetchInspirationPostCommentData(id, token).then((data) =>
        setShowComments(data)
      );
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// Chat /////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();

  function startChat(userID) {
    navigate("/Chat?id=" + userID); //Skicka parameter i urlen.
  }

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("inspirationheaderH2")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            <div>
              <StyledH3>{t("inspirationheaderPost")}</StyledH3>
              <div>
                {showPosts != false &&
                  showPosts.map((post: ShowInspirationPost) => (
                    <WrapperPost key={post.inspirationPostID}>
                      <WrapperRowSpaceBetween>
                        {showUsers
                          .filter(
                            (user) =>
                              Number(user.userID) == post.inspirationPostUserID
                          )
                          .map((user: ShowPersons) => (
                            <>
                              <WrapperUserview
                                onClick={() => {
                                  startChat(user.userID);
                                }}
                                key={user.userID}
                              >
                                <StyledUserImg
                                  width={70}
                                  height={70}
                                  src={`http://localhost:3000/upload/users/${user.userImg}`}
                                  alt={t("alttextuserimg")}
                                />
                                <StyledTextBold>
                                  {user.userFirstname} {user.userLastname}
                                </StyledTextBold>
                              </WrapperUserview>
                              <WrapperRow>
                                {user.userID == getUser() && (
                                  <StyledDeliteItem
                                    onClick={() => {
                                      deleteInspirationPost(
                                        post.inspirationPostID
                                      );
                                    }}
                                    width={30}
                                    height={30}
                                    src={trashIcon}
                                  />
                                )}
                                <StyledTextBoldDate>
                                  {new Date(
                                    post.inspirationPostDate
                                  ).toLocaleString("sv-SE")}
                                </StyledTextBoldDate>
                              </WrapperRow>
                            </>
                          ))}
                      </WrapperRowSpaceBetween>
                      <StyledInspirationPostImg
                        width={160}
                        height={75}
                        src={`http://localhost:3000/upload/inspiration/${post.inspirationPostImg}`}
                        alt={t("alttextinspirationimg")}
                      />
                      <StyledTextGold>
                        {post.inspirationPostHeader}
                      </StyledTextGold>
                      <StyledText>{post.inspirationPostDescription}</StyledText>
                      {showComments
                        .filter(
                          (comment) =>
                            comment.inspirationCommentsPostID ==
                            post.inspirationPostID
                        )
                        .map((comment: ShowInspirationPostComment) => (
                          <WrapperComment key={comment.inspirationCommentsID}>
                            <WrapperRowSpaceBetween>
                              {showUsers
                                .filter(
                                  (user) =>
                                    Number(user.userID) ==
                                    comment.inpirationCommentsUserID
                                )
                                .map((user: ShowPersons) => (
                                  <>
                                    <WrapperUserview
                                      onClick={() => {
                                        startChat(user.userID);
                                      }}
                                      key={user.userID}
                                    >
                                      <StyledUserImg
                                        width={70}
                                        height={70}
                                        src={`http://localhost:3000/upload/users/${user.userImg}`}
                                        alt={t("alttextuserimg")}
                                      />
                                      <StyledTextBold>
                                        {user.userFirstname} {user.userLastname}
                                      </StyledTextBold>
                                    </WrapperUserview>
                                    <WrapperRow>
                                      {user.userID == getUser() && (
                                        <StyledDeliteItem
                                          onClick={() => {
                                            deleteInspirationCommnet(
                                              Number(
                                                comment.inspirationCommentsID
                                              )
                                            );
                                          }}
                                          width={30}
                                          height={30}
                                          src={trashIcon}
                                        />
                                      )}
                                      <StyledTextBoldDate>
                                        {new Date(
                                          comment.inspirationCommentsDate
                                        ).toLocaleString("sv-SE")}
                                      </StyledTextBoldDate>
                                    </WrapperRow>
                                  </>
                                ))}
                            </WrapperRowSpaceBetween>
                            <StyledText>
                              {comment.inspirationCommentsDescription}
                            </StyledText>
                          </WrapperComment>
                        ))}
                      <form
                        onSubmit={(e) =>
                          handleCommentSubmit(e, post.inspirationPostID)
                        }
                      >
                        <WrapperComment>
                          <StyledText>
                            {t("inspirationPostCommentDescriptionText")}
                          </StyledText>
                          <WrapperRowSpaceBetween>
                            <StyledTextInputComment
                              value={
                                formCommentData.inspirationPostCommentDescription
                              }
                              type="text"
                              onChange={handleCommentChange}
                              name="inspirationPostCommentDescription"
                            />
                            <StyledButtonInspirationviewComment>
                              {t("inspirationCommentBtn")}
                            </StyledButtonInspirationviewComment>
                          </WrapperRowSpaceBetween>
                          <ErrorMassage>
                            {errorInspirationPostCommentMessage}
                          </ErrorMassage>
                        </WrapperComment>
                      </form>
                    </WrapperPost>
                  ))}
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
                    <StyledTextInputHoleRow
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
                    <StyledTextInputHoleRow
                      value={formData.inspirationPostDescription}
                      type="text"
                      onChange={handleChange}
                      name="inspirationPostDescription"
                    />
                  </div>

                  <div>
                    <StyledText>{t("inspirationPostImg")}</StyledText>
                    <StyledTextInputHoleRow
                      type="file"
                      onChange={handleChange}
                      name="inspirationPostImg"
                    />
                  </div>
                </div>
                <OkMassage>{okSellingPostMessage}</OkMassage>
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
