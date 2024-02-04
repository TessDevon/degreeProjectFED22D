const BASE_URL = import.meta.env.VITE_BASE_URL

export function saveSellItemBuyData (sellingItemBuyDescription, id, token, sellingItemUnserID, sellingItemID ) {
    return fetch(`${BASE_URL}/sellingPostItemComments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({sellingPostItemCommentsDescription:sellingItemBuyDescription, sellingpostitemcommentsUserID:sellingItemUnserID, sellingPostItemID:sellingItemID, userID:id, token:token})
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Det gick inte att skicka in varan"
        }
    })
    .then(data=> {console.log('Sparat köpinlägg');return data;})
    .then(data => {
        return true;
    })
    .catch ((err) => {
        console.log(err)
        return false;
    });
}


export function fetchSellBuyItemData (userID, token) {
    return fetch(`${BASE_URL}/sellingPostItemComments`, {
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

export function deleteSellItemCommentData (userID, token, deleteItemCommentId) {
    return fetch(`${BASE_URL}/sellingPostItemComments/` + deleteItemCommentId, {
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

