export function saveInspirationPostData (inspirationPostHeader, inspirationPostDescription, inspirationPostImg, userID, token) {
    return fetch("http://localhost:3000/inspirationPost", {
        method:"POST", 
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({newInspirationPostHeader:inspirationPostHeader, newInspirationPostDescription: inspirationPostDescription, newInspirationImg:inspirationPostImg, userID:userID, token:token})
    })
    
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Inlägget går ej att spara"
        }
    })
    .then(data => {console.log('Sparad post');return data;})
    .then(data => {
        savePostImg(inspirationPostImg, userID, token, data.postID)
        return true;
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}

    export function savePostImg (inspirationPostImg, userID, token, inspirationPostID) {
        console.log(inspirationPostImg)
        const formdata = new FormData()
        formdata.append("image", inspirationPostImg)
        return fetch("http://localhost:3000/inspirationPost/" + inspirationPostID +"/postimage", {
            method: "POST",
            headers: {
                "token": token,
                "userID": userID
            },
            body:formdata
        })
        .then(data => {console.log("Bild sparad"); return true;})
        .catch ((err) => {
            console.log(err)
            return false; 
        });
    }

    export function fetchInspirationPostData (userID, token) {
        return fetch("http://localhost:3000/inspirationPost", {
            method:"GET", 
            headers:{
                "token": token,
                "userID": userID
            },
        })
        
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Går ej att hämta post"
            }
        })
        .then(data => {console.log('Sparad post');return data;})
        .then(data => {
            
            return data;
        })
        .catch((err) => {
            console.log(err)
            return false
        })
    }
    

    export function saveInspirationPostCommentData (inspirationCommentsDescription, userID, token, inspirationCommentsPostID) {
        return fetch("http://localhost:3000/inspirationComment/", {
            method:"POST", 
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({inspirationCommentsDescription:inspirationCommentsDescription, token:token, userId:userID, inspirationCommentsPostID:inspirationCommentsPostID})
        })
        
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Går ej att spara kommentaren"
            }
        })
        .then(data => {console.log('Sparad kommentar');return data;})
        .then(data => {
            return true;
        })
        .catch((err) => {
            console.log(err)
            return false
        })
    }

    export function fetchInspirationPostCommentData (userID, token) {
        return fetch("http://localhost:3000/inspirationComment/", {
            method:"GET", 
            headers:{
                "token": token,
                "userID": userID
            },
        })
        
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Går ej att hämta kommentareren"
            }
        })
        .then(data => {console.log('Hämtat kommentar');return data;})
        .then(data => {
            return data;
        })
        .catch((err) => {
            console.log(err)
            return false
        })
    }

    
