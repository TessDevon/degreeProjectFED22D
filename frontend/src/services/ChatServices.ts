export function fetchChatPersonsData(userID, token) {
    return fetch("http://localhost:3000/chatUser/", {
        method:"GET",
        headers: {
            userID: userID,
        },
        //body: JSON.stringify({userID:userID, token:token}),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Chatuser is not fetch";
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err)
            return false;
        })
  }