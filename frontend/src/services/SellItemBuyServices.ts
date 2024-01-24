export function saveSellItemBuyData (sellingItemBuyDescription, id, token, sellingItemUnserID, sellingItemID ) {
    return fetch("http://localhost:3000/sellingPostItemComments", {
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
    return fetch("http://localhost:3000/sellingPostItemComments", {
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