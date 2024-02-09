const BASE_URL = import.meta.env.VITE_BASE_URL;

export function saveInspirationPostData(
  inspirationPostHeader,
  inspirationPostDescription,
  inspirationPostImg,
  userID,
  token
) {
  return fetch(`${BASE_URL}/inspirationPost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newInspirationPostHeader: inspirationPostHeader,
      newInspirationPostDescription: inspirationPostDescription,
      newInspirationImg: inspirationPostImg,
      userID: userID,
      token: token,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw "Inlägget går ej att spara";
      }
    })
    .then((data) => {
      console.log("Sparad post");
      return data;
    })
    .then((data) => {
      return savePostImg(inspirationPostImg, userID, token, data.postID);
      //return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function savePostImg(
  inspirationPostImg,
  userID,
  token,
  inspirationPostID
) {
  const formdata = new FormData();
  formdata.append("image", inspirationPostImg);
  return fetch(
    `${BASE_URL}/inspirationPost/` + inspirationPostID + "/postimage",
    {
      method: "POST",
      headers: {
        token: token,
        userID: userID,
      },
      body: formdata,
    }
  )
    .then((data) => {
      console.log("Bild sparad");
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function fetchInspirationPostData(userID, token) {
  return fetch(`${BASE_URL}/inspirationPost`, {
    method: "GET",
    headers: {
      token: token,
      userID: userID,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw "Går ej att hämta post";
      }
    })
    .then((data) => {
      console.log("Sparad post");
      return data;
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function deleteInspirationPostData(
  userID,
  token,
  deleteInspirationPostId
) {
  return fetch(`${BASE_URL}/inspirationPost/` + deleteInspirationPostId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userID,
      token: token,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw "Post not deleted";
      }
    })
    .then((data) => {
      console.log("Deleted post");
      return data;
    })
    .then((data) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
