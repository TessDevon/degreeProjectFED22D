
    // Function that saves a new user, if the email is not already registered.
    // The requirements are in the front end.
    

    export function saveNewUserData (firstname,lastname,email,password,userImage) {
        return fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",      
            },
            body: JSON.stringify({newEmail:email, newPassword:password, newFirstname:firstname, newLastname:lastname})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Emailen har redan en användare."
            }
        })
        .then(data=> {console.log('Sparad användare');return data;})
        .then(data =>{
            localStorage.setItem("userIdLocalStorage", JSON.stringify({id:data.userId, token:data.token}))
            saveUserImg(userImage, data.userId, data.token)
            return true;
        })
        .catch ((err) => {
            console.log(err)
            return false;
        });
    }

    export function saveUserImg (userImage, userId, token) {
        console.log(userImage)
        const formdata = new FormData()
        formdata.append("image", userImage)
        return fetch("http://localhost:3000/users/" +userId+ "/userimage", {
            method: "POST", 
            headers: {
                "token": token
            },
            body: formdata
        })
        .then(data=> {console.log("Bild sparad"); return true;})
        .catch ((err) => {
            console.log(err)
            return false;
        });
    }


    // Function that logs in users, if the email is in the database and the password matches. 
    // The requirements are in the front end.

    export function LoginUser (email, password) {
        return fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify({userEmail:email, userPassword:password})
        })
        .then(res => {
            if (res.ok) {
                //console.log("You are logged in")
                return res.json();
            } else {
                throw "Login failed"
            }
        })
        .then(data =>{
            localStorage.setItem("userIdLocalStorage", JSON.stringify({id:data.userId, token:data.token}))
            return true;
        })
        .catch ((err) => {
            console.log(err)
            return false;
    })
}
    
    
    