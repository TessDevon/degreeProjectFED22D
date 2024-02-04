const BASE_URL = import.meta.env.VITE_BASE_URL

export function saveSellPostData (sellingPostHeader, sellingPostDescription, sellingPostImg, userID, token) {
    
    return fetch(`${BASE_URL}/sellingPost`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify({sellingPostHeader:sellingPostHeader, sellingPostDescription:sellingPostDescription, userID:userID, token:token})
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Något gick fel. Det gick inte att spara inlägget."
        }
    })
    .then(data=> {console.log('Sparat inlägg');return data;})
    .then(data =>{
        return saveSellPostImg(sellingPostImg, userID, token, data.postID)
    })
    .catch ((err) => {
        console.log(err)
        return false;
    });
}

export function saveSellPostImg (sellingPostImg, userID, token, sellingPostID) {
    console.log(sellingPostImg)
    const formdata = new FormData()
    formdata.append("image", sellingPostImg)
    return fetch(`${BASE_URL}/sellingPost/` + sellingPostID +"/sellimage", {
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


export function fetchSellPostData (userID, token) {
    return fetch(`${BASE_URL}/sellingPost`, {
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


export function deleteSellPostData (userID, token, deletePostId) {
    return fetch(`${BASE_URL}/sellingPost/` + deletePostId, {
        method:"DELETE", 
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify({
            userId:userID, token:token 
        })
    })
    
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Post not deleted"
        }
    })
    .then(data => {console.log('Deleted post');return data;})
    .then(data => {
        return true;
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}