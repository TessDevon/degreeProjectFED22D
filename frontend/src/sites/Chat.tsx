import LoginModal from "../components/LoginModal";
import { StyledH2, StyledH3 } from "../components/styled/Headers";
import { useTranslation } from "react-i18next";
import {
  WrapperBody,
  WrapperChatLeft,
  WrapperChatRight,
  WrapperChatuser,
  WrapperChatuserActive,
  WrapperInspirationRightInnerView,
  WrapperRowSpaceBetween,
  WrapperbodyInnerLeftInspiration,
  WrapperbodyInnerRightInspiration,
  WrapperbodyOuter,
} from "../components/styled/Wrappers";
import {
  StyleChatTextLeft,
  StyleChatTextLeftRight,
  StyleChatTextRightRight,
  StyledChatText,
  StyledChatTextRight,
  StyledSpanGoldText,
  StyledText,
  StyledTextBold,
} from "../components/styled/Text";
import { createSocket } from "../socket";
import { ChangeEvent, useEffect, useState } from "react";
import { StyledTextInputComment } from "../components/styled/Form";
import { StyledButtonInspirationviewComment } from "../components/styled/Buttons";
import { ErrorMassage } from "../components/styled/ErrorMassage";
import { fetchPersonsData } from "../services/UserServices";
import { ShowPersons } from "../models/PersonClass";
import { fetchChatPersonsData } from "../services/ChatServices";
import { StyledUserImg, StyledUserImgChat } from "../components/styled/Image";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
  const { t } = useTranslation();
  const checkPostText = new RegExp(/^[a-zA-ZåäöÅÄÖ 0-9,.'-/!?:();]+$/i);
  const [chatmessageEvents, setChatmessageEvents] = useState([]);
  const [otherChatPersonID, setOtherChatPersonID] = useState("");
  const [chatID, setChatID] = useState("");
  const [showUsers, setShowUsers] = useState<ShowPersons[]>([]);
  const [showChatUser, setShowChatUser] = useState(undefined);
  const [socket, setSocket] = useState(createSocket());
  const [formData, setFormData] = useState({
    chatComment: "",
  });
  const [errorChatMessage, seterrorChatMessage] = useState("");
  const sellingPostErrorName = t("inspirationPostErrorName");

  let userId = "";
  let token = "";
  const navigate = useNavigate();

  // Fetch the userId and token from localstorage to be used for authentication later.
  const userLocalstorage = JSON.parse(
    localStorage.getItem("userIdLocalStorage") || "{}"
  );
  if (userLocalstorage) {
    userId = userLocalstorage.id;
    token = userLocalstorage.token;
  }

  useEffect(() => {
    // Gets users from lists in the backend, all users and the users that are in the chat history of the login person.
    const fetchUsersfunction = async () => {
      setShowUsers(await fetchPersonsData(userId, token));
    };
    const fetchChatUsersfunction = async () => {
      setShowChatUser(await fetchChatPersonsData(userId, token));
    };
    // Bring ID on the user to chat with
    const searchParams = new URLSearchParams(location.search);
    if (otherChatPersonID == "")
      setOtherChatPersonID(searchParams.get("id") || "");

    if (showUsers.length == 0) fetchUsersfunction();
    if (showChatUser == undefined) fetchChatUsersfunction();
  }, [otherChatPersonID, showUsers, showChatUser, userId, token]);

  useEffect(() => {
    if (otherChatPersonID === "") {
      return;
    }
    if (socket.connected) {
      return;
    }

    function onConnect() {
      // Send login-data for the logged in user
      socket.emit("chatLogin", { userId, token });
      setChatmessageEvents([]);
      // Send data of the user to chat with
      socket.emit("newchat", {
        userId: userId,
        otherChatPersonID: otherChatPersonID,
      });
    }

    // Got message to the chat from backend.
    function onChatmessageEvent(value) {
      setChatmessageEvents((previous) => [...previous, value]);
    }

    // Got chatID to start chat.
    function onChatId(msg) {
      setChatID(msg.chatID);
      fetchChatPersonsData(userId, token).then((data) => setShowChatUser(data));
      //Fix so person show in list when new chat starts.
    }

    // Function that runs when a certain message is received.
    socket.on("connect", onConnect);
    socket.on("chatmessage", onChatmessageEvent);
    socket.on("chatID", onChatId);
    socket.connect();

    return () => {
      // Disconnecting connection
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("chatmessage", onChatmessageEvent);
      socket.off("chatID", onChatId);
    };
  }, [otherChatPersonID, socket, token, userId]);

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

  function handleChatSubmit(event) {
    event.preventDefault();
    if (checkPostText.test(formData.chatComment)) {
      // Send messages from the form.

      socket.emit("chatmessage", {
        text: formData.chatComment,
        chatID: chatID,
        otherChatPersonID: otherChatPersonID,
        userId: userId,
      });
      setFormData({ chatComment: "" });
    } else {
      seterrorChatMessage(sellingPostErrorName);
    }
  }

  function getUser() {
    // Get the logged in users own ID from localstorage
    let id = "";
    const userLocalstorage = JSON.parse(
      localStorage.getItem("userIdLocalStorage") || ""
    );
    if (userLocalstorage) {
      id = userLocalstorage.id;
    }
    return id;
  }

  // Start chat with user in chatview
  function startChatfromChat(userID: string) {
    setOtherChatPersonID(userID);
    navigate("/Chat?id=" + userID);
    setFormData({ chatComment: "" });
  }

  return (
    <>
      <WrapperBody>
        <StyledH2>{t("chatH3")}</StyledH2>
        <WrapperbodyOuter>
          <WrapperbodyInnerLeftInspiration>
            {chatmessageEvents.map((message) => (
              <>
                {showUsers
                  .filter((user) => user.userID == message.userId)
                  .map((user) => (
                    <>
                      <div>
                        {message.userId === getUser() && (
                          <WrapperChatRight>
                            <StyledChatTextRight>
                              {t("chatInnerTextMe")}
                            </StyledChatTextRight>
                            <StyledChatText>{message.text}</StyledChatText>
                            <StyleChatTextRightRight>
                              {new Date(message.time).toLocaleString("sv-SE")}
                            </StyleChatTextRightRight>
                          </WrapperChatRight>
                        )}
                        {message.userId != getUser() && (
                          <WrapperChatLeft>
                            <StyledUserImgChat
                              width={70}
                              height={70}
                              src={`http://localhost:3000/upload/users/${user.userImg}`}
                            />
                            <StyleChatTextLeft>
                              {user.userFirstname} {user.userLastname}{" "}
                              {t("chatInnerTextOtherPerson")}
                            </StyleChatTextLeft>
                            <StyledChatText>{message.text}</StyledChatText>
                            <StyleChatTextLeftRight>
                              {new Date(message.time).toLocaleString("sv-SE")}
                            </StyleChatTextLeftRight>
                          </WrapperChatLeft>
                        )}
                      </div>
                    </>
                  ))}
              </>
            ))}
          </WrapperbodyInnerLeftInspiration>
          <WrapperbodyInnerRightInspiration>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("chatHeaderFormText")}</StyledH3>
              <form onSubmit={handleChatSubmit}>
                <div>
                  <StyledText>{t("chatMessageText")}</StyledText>
                  <WrapperRowSpaceBetween>
                    <StyledTextInputComment
                      value={formData.chatComment}
                      type="text"
                      onChange={handleChange}
                      name="chatComment"
                    />
                    <StyledButtonInspirationviewComment>
                      {t("chatMessageBtnText")}
                    </StyledButtonInspirationviewComment>
                  </WrapperRowSpaceBetween>
                  <ErrorMassage>{errorChatMessage}</ErrorMassage>
                </div>
              </form>
            </WrapperInspirationRightInnerView>
            <WrapperInspirationRightInnerView>
              <StyledH3>{t("chatHeaderChatInfoText")}</StyledH3>
              <StyledText>{t("chatInfoText")}</StyledText>
              <StyledSpanGoldText>
                {t("chatInfoTextBoldGold")}
              </StyledSpanGoldText>
              <StyledTextBold>{t("chatInfoTextBold")}</StyledTextBold>
            </WrapperInspirationRightInnerView>
            <div>
              <StyledH3>{t("chatHeaderUserText")}</StyledH3>

              {showChatUser != undefined &&
                showChatUser
                  .map((chatuser) => {
                    if (chatuser.user1 == userId) return chatuser.user2;
                    return chatuser.user1;
                  })
                  .map((chatuser) => (
                    <>
                      {showUsers
                        .filter((user) => user.userID == chatuser)
                        .map(
                          (user) =>
                            chatuser != otherChatPersonID && (
                              <WrapperChatuser
                                onClick={() => {
                                  startChatfromChat(user.userID);
                                }}
                              >
                                <StyledUserImg
                                  width={70}
                                  height={70}
                                  src={`http://localhost:3000/upload/users/${user.userImg}`}
                                />
                                <StyledTextBold>
                                  {user.userFirstname} {user.userLastname}
                                </StyledTextBold>
                              </WrapperChatuser>
                            )
                        )}
                      {showUsers
                        .filter((user) => user.userID == chatuser)
                        .map(
                          (user) =>
                            chatuser == otherChatPersonID && (
                              <WrapperChatuserActive
                                onClick={() => {
                                  startChatfromChat(user.userID);
                                }}
                              >
                                <StyledUserImg
                                  width={70}
                                  height={70}
                                  src={`http://localhost:3000/upload/users/${user.userImg}`}
                                />
                                <StyledTextBold>
                                  {user.userFirstname} {user.userLastname}
                                </StyledTextBold>
                              </WrapperChatuserActive>
                            )
                        )}
                    </>
                  ))}
            </div>
          </WrapperbodyInnerRightInspiration>
        </WrapperbodyOuter>
      </WrapperBody>
      <LoginModal></LoginModal>
    </>
  );
};
