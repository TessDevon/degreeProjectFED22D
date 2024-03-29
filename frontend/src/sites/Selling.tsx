const BASE_URL = import.meta.env.VITE_BASE_URL;
import LoginModal from "../components/LoginModal";
import { StyledButtonInspirationviewComment } from "../components/styled/Buttons";
import { ErrorMassage, OkMassage } from "../components/styled/ErrorMassage";
import {
  StyledTextInput,
  StyledTextInputComment,
  StyledTextInputHoleRow,
} from "../components/styled/Form";
import { StyledH2, StyledH3 } from "../components/styled/Headers";
import {
  StyledDeliteItem,
  StyledInspirationPostImg,
  StyledUserImg,
} from "../components/styled/Image";
import {
  StyledText,
  StyledTextBold,
  StyledTextBoldDate,
  StyledTextGold,
} from "../components/styled/Text";
import {
  WrapperBody,
  WrapperComment,
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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  deleteSellPostData,
  fetchSellPostData,
  saveSellPostData,
} from "../services/SellPostServices";
import {
  deleteSellItemData,
  fetchSellItemData,
  saveSellItemData,
} from "../services/SellItemServises";
import {
  SellingPostItem,
  ShowSellPost,
  ShowSellingPostComment,
  ShowSellingPostItem,
  sellPost,
} from "../models/SellPosts";
import { ShowPersons } from "../models/PersonClass";
import { fetchPersonsData } from "../services/UserServices";
import {
  deleteSellItemCommentData,
  fetchSellBuyItemData,
  saveSellItemBuyData,
} from "../services/SellItemBuyServices";
import { useNavigate } from "react-router-dom";

export const Selling = () => {
  const { t } = useTranslation();
  const [okSellingPostMessage, setOkSellingPostMessage] = useState("");
  const [errorSellingPostMessage, seterrorSellingPostMessage] = useState("");
  const [errorSellingPostItemMessage, seterrorSellingPostItemMessage] =
    useState("");
  const [errorSellingPostItemBuyMessage, seterrorSellingPostItemBuyMessage] =
    useState("");
  const [formData, setFormData] = useState<sellPost>({
    sellPostHeader: "",
    sellPostDescription: "",
    sellPostImg: undefined,
  });
  const [formItemData, setFormItemData] = useState<SellingPostItem>({
    sellingItemDescription: "",
    sellingItemImg: undefined,
  });
  const [formSellData, setformSellData] = useState({
    sellingItemBuyDescription: "",
  });
  const [showPosts, setShowPost] = useState<ShowSellPost[]>([]);
  const [showUsers, setShowUsers] = useState<ShowPersons[]>([]);
  const [showItemComments, setShowItemComments] = useState<
    ShowSellingPostItem[]
  >([]);
  const [showComments, setShowComments] = useState<ShowSellingPostComment>([]);

  const checkPostText = new RegExp(/^[a-zA-ZåäöÅÄÖ 0-9,.'-/!?:();]+$/i);
  const checkPostImg = new RegExp(/.*\.(jpe?g|png|jpg)$/i);
  const sellingPostErrorName = t("inspirationPostErrorName");
  const sellingPostErrorImg = t("inspirationPostErrorImg");
  const sellingPostErrorServererror = t("inspirationPostErrorServererror");
  const okmessage = t("sellingOkMessage");

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
      setShowItemComments(await fetchSellItemData(id, token));
      setShowComments(await fetchSellBuyItemData(id, token));
    };
    if (showPosts.length == 0) fetchPostFunction();
  }, [showPosts, showUsers /*showComments*/]);

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

    function okMessage() {
      setOkSellingPostMessage("");
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
              fetchSellPostData(id, token).then((data) => setShowPost(data));
              setOkSellingPostMessage(okmessage);
              setTimeout(okMessage, 3000);
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

  const deletePost = (deletePostId: number) => {
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

    deleteSellPostData(id, token, deletePostId).then(() => {
      fetchSellPostData(id, token).then((data) => setShowPost(data));
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////// Form to sell Item /////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setFormItemData({ ...formItemData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setFormItemData({ ...formItemData, [name]: +e.target.value });
    }
    if (e.target.type === "file" && e.target.files != null) {
      setFormItemData({ ...formItemData, [name]: e.target.files[0] });
    }
  };

  const handleItemSubmit = (
    e: FormEvent,
    sellingItemPostID: number,
    sellingPostUserID: number
  ) => {
    e.preventDefault();
    console.log();

    let id = "";
    let token = "";

    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }

    if (checkPostText.test(formItemData.sellingItemDescription)) {
      console.log(formItemData.sellingItemImg);
      if (
        formItemData.sellingItemImg != undefined &&
        checkPostImg.test(formItemData.sellingItemImg?.name)
      ) {
        saveSellItemData(
          formItemData.sellingItemDescription,
          formItemData.sellingItemImg,
          id,
          token,
          sellingPostUserID,
          sellingItemPostID
        ).then((ok) => {
          if (ok) {
            seterrorSellingPostItemMessage("");
            setFormItemData({
              sellingItemDescription: "",
              sellingItemImg: undefined,
            });
            fetchSellItemData(id, token).then((data) =>
              setShowItemComments(data)
            );
          } else {
            seterrorSellingPostItemMessage(sellingPostErrorServererror);
          }
        });
      } else {
        seterrorSellingPostItemMessage(sellingPostErrorImg);
      }
    } else {
      seterrorSellingPostItemMessage(sellingPostErrorName);
    }
  };

  const deleteItem = (deleteItemId: number) => {
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

    deleteSellItemData(id, token, deleteItemId).then(() => {
      fetchSellItemData(id, token).then((data) => setShowItemComments(data));
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// Form to Comment /////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////

  const handleItemBuyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.type === "text") {
      setformSellData({ ...formSellData, [name]: e.target.value });
    }
    if (e.target.type === "number") {
      setformSellData({ ...formSellData, [name]: +e.target.value });
    }
    if (e.target.type === "file" && e.target.files != null) {
      setformSellData({ ...formSellData, [name]: e.target.files[0] });
    }
  };

  const handleItemBuySubmit = (
    e: FormEvent,
    sellingItemID: number,
    sellingItemUnserID: number
  ) => {
    e.preventDefault();
    console.log();

    let id = "";
    let token = "";

    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
      token = userLocalstorage.token;
    }
    console.log(sellingItemID);
    if (checkPostText.test(formSellData.sellingItemBuyDescription)) {
      saveSellItemBuyData(
        formSellData.sellingItemBuyDescription,
        id,
        token,
        sellingItemUnserID,
        sellingItemID
      ).then((ok) => {
        if (ok) {
          seterrorSellingPostItemBuyMessage("");

          fetchSellBuyItemData(id, token).then((data) => setShowComments(data));
          setformSellData({
            sellingItemBuyDescription: "",
          });
        } else {
          seterrorSellingPostItemBuyMessage(sellingPostErrorServererror);
        }
      });
    } else {
      seterrorSellingPostItemBuyMessage(sellingPostErrorName);
    }
  };

  const deleteItemComment = (deleteItemCommentId: number) => {
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

    deleteSellItemCommentData(id, token, deleteItemCommentId).then(() => {
      fetchSellBuyItemData(id, token).then((data) => setShowComments(data));
    });
  };

  const navigate = useNavigate();

  function startChat(userID) {
    navigate("/Chat?id=" + userID); //Skicka parameter i urlen.
  }

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("sellviewHeaderH2")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            <div>
              <StyledH3>{t("sellviewHeaderPost")}</StyledH3>
              <div>
                {showPosts != false &&
                  showPosts.map((post: ShowSellPost) => (
                    <WrapperPost key={post.sellingPostID}>
                      <WrapperRowSpaceBetween>
                        {showUsers
                          .filter(
                            (user) =>
                              Number(user.userID) == post.sellingPostUserID
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
                                  src={`${BASE_URL}/upload/users/${user.userImg}`}
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
                                      deletePost(post.sellingPostID);
                                    }}
                                    width={30}
                                    height={30}
                                    src={trashIcon}
                                  />
                                )}
                                <StyledTextBoldDate>
                                  {new Date(
                                    post.sellingPostDate
                                  ).toLocaleString("sv-SE")}
                                </StyledTextBoldDate>
                              </WrapperRow>
                            </>
                          ))}
                      </WrapperRowSpaceBetween>
                      <StyledInspirationPostImg
                        width={160}
                        height={75}
                        src={`${BASE_URL}/upload/selling/${post.sellingPostImg}`}
                        alt={t("alttextSellingGroupImg")}
                      />
                      <StyledTextGold>{post.sellingPostHeader}</StyledTextGold>
                      <StyledText>{post.sellingPostDescription}</StyledText>
                      {post.sellingPostUserID == Number(getUser()) && (
                        <form
                          onSubmit={(e) =>
                            handleItemSubmit(
                              e,
                              post.sellingPostID,
                              post.sellingPostUserID
                            )
                          }
                        >
                          <WrapperComment>
                            <StyledText>{t("sellingItemInutText")}</StyledText>
                            <WrapperRowSpaceBetween>
                              <StyledTextInputComment
                                value={formItemData.sellingItemDescription}
                                type="text"
                                onChange={handleItemChange}
                                name="sellingItemDescription"
                              />
                              <StyledTextInput
                                type="file"
                                onChange={handleItemChange}
                                name="sellingItemImg"
                              />
                              <StyledButtonInspirationviewComment>
                                {t("sellItemBtn")}
                              </StyledButtonInspirationviewComment>
                            </WrapperRowSpaceBetween>
                            <ErrorMassage>
                              {errorSellingPostItemMessage}
                            </ErrorMassage>
                          </WrapperComment>
                        </form>
                      )}
                      {showItemComments
                        .filter(
                          (itemcomment: ShowSellingPostItem) =>
                            itemcomment.sellingItemPostID == post.sellingPostID
                        )
                        .map((itemcomment: ShowSellingPostItem) => (
                          <WrapperItemComment key={itemcomment.sellingItemID}>
                            <WrapperRowSpaceBetween>
                              {showUsers
                                .filter(
                                  (user) =>
                                    Number(user.userID) ==
                                    itemcomment.sellingItemUnserID
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
                                        src={`${BASE_URL}/upload/users/${user.userImg}`}
                                        alt={t("alttextuserimg")}
                                      />
                                      <StyledTextBold>
                                        {user.userFirstname} {user.userLastname}
                                      </StyledTextBold>
                                    </WrapperUserview>

                                    <WrapperRowSpaceBetween>
                                      <WrapperRow>
                                        {user.userID == getUser() && (
                                          <StyledDeliteItem
                                            onClick={() => {
                                              deleteItem(
                                                itemcomment.sellingItemID
                                              );
                                            }}
                                            width={30}
                                            height={30}
                                            src={trashIcon}
                                          />
                                        )}
                                        <StyledTextBoldDate>
                                          {new Date(
                                            itemcomment.sellingItemDate
                                          ).toLocaleString("sv-SE")}
                                        </StyledTextBoldDate>
                                      </WrapperRow>
                                    </WrapperRowSpaceBetween>
                                  </>
                                ))}
                            </WrapperRowSpaceBetween>
                            <StyledInspirationPostImg
                              width={160}
                              height={75}
                              src={`${BASE_URL}/upload/selling/${itemcomment.sellingItemImg}`}
                              alt={t("alttextSellingItemImg")}
                            />
                            <StyledText>
                              {itemcomment.sellingItemDescription}
                            </StyledText>
                            {showComments
                              .filter(
                                (comment: ShowSellingPostComment) =>
                                  comment.sellingPostItemID ==
                                  itemcomment.sellingItemID
                              )
                              .map((comment: ShowSellingPostComment) => (
                                <WrapperCommentBuy
                                  key={comment.sellingPostItemCommentsID}
                                >
                                  <WrapperRowSpaceBetween>
                                    {showUsers
                                      .filter(
                                        (user) =>
                                          Number(user.userID) ==
                                          comment.sellingpostitemcommentsUserID
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
                                              src={`${BASE_URL}/upload/users/${user.userImg}`}
                                              alt={t("alttextuserimg")}
                                            />
                                            <StyledTextBold>
                                              {user.userFirstname}{" "}
                                              {user.userLastname}
                                            </StyledTextBold>
                                          </WrapperUserview>
                                          <WrapperRow>
                                            {user.userID == getUser() && (
                                              <StyledDeliteItem
                                                onClick={() => {
                                                  deleteItemComment(
                                                    comment.sellingPostItemCommentsID
                                                  );
                                                }}
                                                width={30}
                                                height={30}
                                                src={trashIcon}
                                              />
                                            )}
                                            <StyledTextBold>
                                              {new Date(
                                                comment.sellingPostItemCommentsDate
                                              ).toLocaleString("sv-SE")}
                                            </StyledTextBold>
                                          </WrapperRow>
                                        </>
                                      ))}
                                  </WrapperRowSpaceBetween>
                                  <StyledText>
                                    {comment.sellingPostItemCommentsDescription}
                                  </StyledText>
                                </WrapperCommentBuy>
                              ))}
                            <form
                              onSubmit={(e) =>
                                handleItemBuySubmit(
                                  e,
                                  itemcomment.sellingItemID,
                                  itemcomment.sellingItemUnserID
                                )
                              }
                            >
                              <WrapperComment>
                                <StyledText>
                                  {t("sellingItemInutBuyText")}
                                </StyledText>
                                <WrapperRowSpaceBetween>
                                  <StyledTextInputComment
                                    value={
                                      formSellData.sellingItemBuyDescription
                                    }
                                    type="text"
                                    onChange={handleItemBuyChange}
                                    name="sellingItemBuyDescription"
                                  />
                                  <StyledButtonInspirationviewComment>
                                    {t("sellItemBuyBtn")}
                                  </StyledButtonInspirationviewComment>
                                </WrapperRowSpaceBetween>
                                <ErrorMassage>
                                  {errorSellingPostItemBuyMessage}
                                </ErrorMassage>
                              </WrapperComment>
                            </form>
                          </WrapperItemComment>
                        ))}
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
                    <StyledTextInputHoleRow
                      value={formData.sellPostHeader}
                      type="text"
                      onChange={handleChange}
                      name="sellPostHeader"
                    />
                  </div>
                  <div>
                    <StyledText>{t("sellPostDescription")}</StyledText>
                    <StyledTextInputHoleRow
                      value={formData.sellPostDescription}
                      type="text"
                      onChange={handleChange}
                      name="sellPostDescription"
                    />
                  </div>

                  <div>
                    <StyledText>{t("sellPostImg")}</StyledText>
                    <StyledTextInputComment
                      //value={formData.sellPostImg}
                      type="file"
                      onChange={handleChange}
                      name="sellPostImg"
                    />
                  </div>
                </div>
                <OkMassage>{okSellingPostMessage}</OkMassage>
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
