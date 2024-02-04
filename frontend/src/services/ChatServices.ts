const BASE_URL = import.meta.env.VITE_BASE_URL

export function fetchChatPersonsData(userID, token) {
    return fetch(`${BASE_URL}/chatUser/`, {
        method:"GET",
        headers: {
            userID: userID,
        },
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