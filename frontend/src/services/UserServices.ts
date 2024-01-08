
    // Användas för att spara i databasen OM värdena stämmer med kraven. 

    export function saveNewUserData (firstname,lastname,email,password,userImage) {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",      
            },
            body: JSON.stringify({newEmail:email, newPassword:password, newFirstname:firstname, newLastname:lastname, userImg:userImage})
        })
        .then(res => res.json())
        .then(data=> {console.log('Sparad användare');return data;})
        .then(data =>{
            localStorage.setItem("userIdLocalStorage", JSON.stringify({id:data.userId, token:data.token}))
            
        })
        /*.then(data => {
            serverMessage.innerHTML = ""
        })*/
        .catch ((err) => {
            console.log(err)
            //serverMessage.innerHTML = "Error! Emailen finns redan i databasen!"
        });
    }/**/

    //För att logga in 

    export function LoginUser (email, password) {
        fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify({userEmail:email, userPassword:password})
    })
    .then(res => {
        if (res.ok) {
        //serverMassage.appendChild(okMessege);
        console.log('Du är inloggad')
        return res.json();
        }
    })
    .then(data =>{
        localStorage.setItem("userIdLocalStorage", JSON.stringify({id:data.userId, token:data.token}))
    })
    .catch ((err) => {
        console.log(err)
    /*const errorMessege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
    serverMassage.style.color = "red";
    serverMassage.appendChild(errorMessege);
    })*/
})
}
    
    
    