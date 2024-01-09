import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { loginPerson, registerPerson } from '../models/PersonClass';
import { LoginUser, saveNewUserData } from '../services/UserServices';


///////////////////// Modals //////////////////////////////////////

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%', //Gör att sidan täcker hela vyn liggandes.
      transform: 'translate(-50%, -50%)',  //Skuggar bakomliggande huvudsida.
    },
  };
        /*console.log(checkPassword);
        console.log(formLoginData.password)*/
export default function LoginModal() {
    Modal.setAppElement('#root');
    const [logininfo, setLogininfo] = useState ('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setRegisterModal] = useState(false);
    const [errorLoginMessage, setErrorLoginMessage] = useState(''); 
    const [errorRegisterMessage, seterrorRegisterMessage] = useState('');
    const checkNames = new RegExp(/^[a-zA-ZåäöÅÄÖ ,.'-]+$/i);
    const checkEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const checkPassword = new RegExp(/^(?=.*[A-ZÅÄÖa-zåäö])(?=.*\d)[A-ZÅÄÖa-zåäö\d]{8,}$/)
    // Kräver inlogging med minst en stor boksav och siffra, minst 6 tecken och inga mellanslag. 
    const checkImg = new RegExp(/\.(jpe?g|png|gif|bmp)$/i)  
    

    ///////////////// Check if user is loggedin //////////////////////

    useEffect(() => {
        setLogininfo(localStorage.getItem('userIdLocalStorage')) 
        //console.log(logininfo);

        if(logininfo==='' || logininfo==null) {
            setShowLoginModal(true)
        } else {
            setShowLoginModal(false)
        }
    }, [logininfo])


    ///////////////////// Handle login ////////////////////////

    const [formLoginData, setFormLoginData] = useState<loginPerson>({
        email: "",
        password: "",
    });

    const handleLoginChange = (e:ChangeEvent<HTMLInputElement>) => {    
        const name = e.target.name; 
        if(e.target.type === "text") {
            setFormLoginData({...formLoginData, [name]:e.target.value});
        }
        if(e.target.type === "number") {
            setFormLoginData({...formLoginData, [name]:+e.target.value});
        }
    }
    const handleLoginSubmit = (e:FormEvent) => {
        e.preventDefault();
        //console.log(formLoginData)
        if(checkEmail.test(formLoginData.email)) {
            if(checkPassword.test(formLoginData.password)) {
                LoginUser(formLoginData.email,formLoginData.password)
                // When the response from the database is OK, the code is executed. 
                // Then: to wait for the entire flow in the backend.
 
                .then ((ok) => {
                    if (ok) {
                        setShowLoginModal(false)
                        setErrorLoginMessage('')
                    } else {
                        setErrorLoginMessage('Det gick inte att logga in denna användare. Fyll i på nytt och försök igen.')
                        setFormLoginData({email: "", password: "",})
                    }
                })
            } else {
                setErrorLoginMessage('lösenord felaktigt ifyllt')
                setShowLoginModal(true)
            }
        } else {
            setErrorLoginMessage('email är fel ifyllt')
            setShowLoginModal(true)
        }
    }

    function goToRegister () {
        setShowLoginModal(false);
        setRegisterModal(true);
    }

    
    ///////////////////// Handle new user //////////////////////

    const [formData, setFormData] = useState<registerPerson>({
        firstname: "",
        lastname:"",
        email: "",
        password: "",
        userImage: "",
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {    
        const name = e.target.name; 
        if(e.target.type === "text") {
            setFormData({...formData, [name]:e.target.value});
        }
        if(e.target.type === "number") {
            setFormData({...formData, [name]:+e.target.value});
        }
    }
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        //console.log(formData)

        if(checkNames.test(formData.firstname)) {
            if(checkNames.test(formData.lastname)) {
                if(checkEmail.test(formData.email)) {
                    if(checkPassword.test(formData.password)) {
                        if(checkImg.test(formData.userImage)) {
                            saveNewUserData(formData.firstname,formData.lastname,formData.email,formData.password,formData.userImage)
                            .then ((ok) => {
                                if (ok) {
                                    setRegisterModal(false)
                                    setErrorLoginMessage('')
                                } else {
                                    seterrorRegisterMessage('Finns redan en användare med denna email.')
                                    setFormData({
                                    firstname: "", 
                                    lastname:"",
                                    email: "",
                                    password: "",
                                    userImage: "",
                                })
                                }
                            });
                            
                        } else {
                            seterrorRegisterMessage('img går ej att spara')
                        }
                    } else {
                        seterrorRegisterMessage('lösenord felaktigt ifyllt')
                    }
                } else {
                    seterrorRegisterMessage('email är fel ifyllt')
                }
            } else {
                seterrorRegisterMessage('efternamnet är fel ifyllt')
            }
        } else {
            seterrorRegisterMessage('Förnamnet är fel ifyllt')
        }
    }
    
    /* To check data in our forms on web.
         <p>{JSON.stringify(formData)}</p>
         <p>{JSON.stringify(formLoginData)}</p> */
   
    return (
        <div className= 'signView'>
            <Modal isOpen={showLoginModal} style={customStyles}>
                <h1>Gå vidare för att ta del av vår unika minivärld!</h1>
                <p> Våra miniatyrvärldar är en inspirationssida för alla som samlar, renoverar och har docksåp som hobby. Här kan man få inspiration genom inlägg från användarna men även en möjlighet att köpa miniatyrer av andra användare eller sälja det man inte längre behöver.</p>
                <h2>Logga in</h2>
                <div className='loginView'>
                    <form onSubmit={handleLoginSubmit}>
                        <p>Epost</p>
                        <input value={formLoginData.email} type='text' onChange={handleLoginChange} name='email'/>
                        <p>Lösenord (minst 6 tecken, varav en stor bokstav och en siffra)</p>
                        <input value={formLoginData.password} type='text' onChange={handleLoginChange} name='password'/>
                        <button>Logga in</button> 
                    </form>
                    <p>{errorLoginMessage}</p>
                    <button onClick={goToRegister}>Registrera dig som ny användare</button>
                </div>
            </Modal>
            <Modal isOpen={showRegisterModal} style={customStyles}>
                <h1>Gå vidare för att ta del av vår unika minivärld!</h1>
                <p> Våra miniatyrvärldar är en inspirationssida för alla som samlar, renoverar och har docksåp som hobby. Här kan man få inspiration genom inlägg från användarna men även en möjlighet att köpa miniatyrer av andra användare eller sälja det man inte längre behöver.</p>
                <h2>Registrera ny användare</h2>
                <form onSubmit={handleSubmit}>
                    <p>Namn</p>
                    <input value={formData.firstname} type='text' onChange={handleChange} name='firstname'/>
                    <p>Efternamn</p>
                    <input value={formData.lastname} type='text' onChange={handleChange} name='lastname'/>
                    <p>Email</p>
                    <input value={formData.email} type='text' onChange={handleChange} name='email'/>
                    <p>Lösenord (minst 6 tecken, varav en stor bokstav och en siffra)</p>
                    <input value={formData.password} type='text' onChange={handleChange} name='password'/>
                    <p>Användarbild (filformatet jpg och png)</p>
                    <input value={formData.userImage} type='img' onChange={handleChange} name='userImage'/>
                    <button>Registrera</button> 
                </form>        
                <p>{errorRegisterMessage}</p>
            </Modal>
        </div>
    )
}