import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { loginPerson, registerPerson } from '../models/PersonClass';
import { LoginUser, saveNewUserData } from '../services/UserServices';
import { useTranslation } from "react-i18next";

///////////////////// Modals //////////////////////////////////////

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%', // Makes the page cover the entire landscape view.
      transform: 'translate(-50%, -50%)',  // Shadows behind main page.
    },
  };
        /*console.log(checkPassword);
        console.log(formLoginData.password)*/
export default function LoginModal() {
    const { t } = useTranslation();
    Modal.setAppElement('#root');
    const [logininfo, setLogininfo] = useState ('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setRegisterModal] = useState(false);
    const [errorLoginMessage, setErrorLoginMessage] = useState(''); 
    const [errorRegisterMessage, seterrorRegisterMessage] = useState('');
    const checkNames = new RegExp(/^[a-zA-ZåäöÅÄÖ ,.'-]+$/i);
    const checkEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const checkPassword = new RegExp(/^(?=.*[A-ZÅÄÖa-zåäö])(?=.*\d)[A-ZÅÄÖa-zåäö\d]{8,}$/)
    // Requires login with at least one capital letter and number, at least 6 characters and no spaces. 
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

    //i18next to js
    const loginErrorEmail = t('loginErrorEmail');
    const loginErrorPassword = t('loginErrorPassword');
    const loginErrorServererror = t('loginErrorServererror')
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
                        setErrorLoginMessage(loginErrorServererror);
                        setFormLoginData({email: "", password: "",})
                    }
                })
            } else {
                setErrorLoginMessage(loginErrorPassword);
                setShowLoginModal(true)
            }
        } else {
            setErrorLoginMessage(loginErrorEmail);
            setShowLoginModal(true)
        }
    }

    function goToRegister () {
        setShowLoginModal(false);
        setRegisterModal(true);
    }

    
    ///////////////////// Handle new user //////////////////////
    //i18next to js
    const registerErrorName = t('registerErrorName');
    const registerErrorImg = t('registerErrorImg');
    const registerErrorServererror = t('registerErrorServererror')
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
                                    seterrorRegisterMessage(registerErrorServererror);
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
                            seterrorRegisterMessage(registerErrorImg)
                        }
                    } else {
                        seterrorRegisterMessage(loginErrorPassword)
                    }
                } else {
                    seterrorRegisterMessage(loginErrorEmail)
                }
            } else {
                seterrorRegisterMessage(registerErrorName)
            }
        } else {
            seterrorRegisterMessage(registerErrorName)
        }
    }
    
    /* To check data in our forms on web.
         <p>{JSON.stringify(formData)}</p>
         <p>{JSON.stringify(formLoginData)}</p> */
   
    return (
        <div className= 'signView'>
            <Modal isOpen={showLoginModal} style={customStyles}>
                <h1>{t('loginMainheader')}</h1>
                <p>{t('loginMaintext')}</p>
                <h2>{t('loginInnerMainheader')}</h2>
                <div className='loginView'>
                    <form onSubmit={handleLoginSubmit}>
                        <p>{t('loginFormEmailText')}</p>
                        <input value={formLoginData.email} type='text' onChange={handleLoginChange} name='email'/>
                        <p>{t('loginFormPasswordText')}</p>
                        <input value={formLoginData.password} type='text' onChange={handleLoginChange} name='password'/>
                        <button>{t('loginFormBtnText')}</button> 
                    </form>
                    <p>{errorLoginMessage}</p>
                    <button onClick={goToRegister}>{t('loginRegisterBtnText')}</button>
                </div>
            </Modal>
            <Modal isOpen={showRegisterModal} style={customStyles}>
                <h1>{t('loginMainheader')}</h1>
                <p> {t('loginMaintext')}</p>
                <h2> {t('registerInnerMainheader')}</h2>
                <form onSubmit={handleSubmit}>
                    <p>{t('registerFirstnameText')}</p>
                    <input value={formData.firstname} type='text' onChange={handleChange} name='firstname'/>
                    <p>{t('registerLastnameText')}</p>
                    <input value={formData.lastname} type='text' onChange={handleChange} name='lastname'/>
                    <p>{t('loginFormEmailText')}</p>
                    <input value={formData.email} type='text' onChange={handleChange} name='email'/>
                    <p>{t('loginFormPasswordText')}</p>
                    <input value={formData.password} type='text' onChange={handleChange} name='password'/>
                    <p>{t('registerUserImgText')}</p>
                    <input value={formData.userImage} type='img' onChange={handleChange} name='userImage'/>
                    <button>{t('registerRegistrationbtnText')}</button> 
                </form>        
                <p>{errorRegisterMessage}</p>
            </Modal>
        </div>
    )
}