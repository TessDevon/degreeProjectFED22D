const BASE_URL = import.meta.env.VITE_BASE_URL

export function saveInspirationPostCommentData(
  inspirationCommentsDescription,
  userID,
  token,
  inspirationCommentsPostID
) {
  return fetch(`${BASE_URL}/inspirationComment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inspirationCommentsDescription: inspirationCommentsDescription,
      token: token,
      userId: userID,
      inspirationCommentsPostID: inspirationCommentsPostID,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw "Går ej att spara kommentaren";
      }
    })
    .then((data) => {
      console.log("Sparad kommentar");
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

export function fetchInspirationPostCommentData(userID, token) {
  return fetch(`${BASE_URL}/inspirationComment/`, {
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
        throw "Går ej att hämta kommentareren";
      }
    })
    .then((data) => {
      console.log("Hämtat kommentar");
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

export function deleteInspirationPostCommentData(
  userID,
  token,
  deleteInspirationPostCommentId
) {
  return fetch(
    `${BASE_URL}/inspirationComment/` +
      deleteInspirationPostCommentId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userID,
        token: token,
      }),
    }
  )
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
