export function saveSellItemData (sellingItemDescription, sellingItemImg, id, token,  sellingItemUnserID, sellingItemID, ) {
    return fetch("http://localhost:3000/sellingPostItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({sellingItemDescription:sellingItemDescription, sellingItemImg:sellingItemImg, sellingItemUserID:sellingItemUnserID, sellingItemPostID:sellingItemID, userID:id, token:token})
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Det gick inte att skicka in varan"
        }
    })
    .then(data=> {console.log('Sparat inlägg');return data;})
    .then(data => {
        saveItemPostImg(sellingItemImg, id, token, data.postID)
        return true;
    })
    .catch ((err) => {
        console.log(err)
        return false;
    });
}

export function saveItemPostImg (sellingItemImg, id, token, sellingItemPostID) {
    console.log(sellingItemImg) 
    const formdata = new FormData()
    formdata.append("image", sellingItemImg)
    return fetch("http://localhost:3000/sellingPostItem/" + sellingItemPostID + "/itemimage", {
        method: "POST", 
        headers: {
            "token": token,
            "userID": id,
            "sellingItemPostID":sellingItemPostID,
        },
        body:formdata
    })
    .then(data => {console.log("Säljbild sparad"); return true;})
    .catch ((err) => {
        console.log(err)
        return false;
    })
}

export function fetchSellItemData (userID, token) {
    return fetch("http://localhost:3000/sellingPostItem", {
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