import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { loginPerson, registerPerson } from '../models/PersonClass';
import { LoginUser, saveNewUserData } from '../services/UserServices';
import { useTranslation } from "react-i18next";
import { StyleH3Gold, StyledH2, StyledH3, StyledLogin, StyledRegistration } from './styled/Headers';
import { StyledText } from './styled/Text';
import { StyledTextInput, StyledTextInputHoleRow, WrapperInputsTwoColum} from './styled/Form';
import { StyledButtonCenter, StyledButtonRightsided } from './styled/Buttons';
import { ErrorMassage } from './styled/ErrorMassage';
import { useNavigate } from 'react-router-dom';

///////////////////// Modals //////////////////////////////////////

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%', // Makes the page cover the entire landscape view.
      transform: 'translate(-50%, -50%)',  // Shadows behind main page.
      paddingLeft:'20%',
      paddingRight:'20%',
      display:'flex',
      flexDirection: 'column', 
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
    const checkImg = new RegExp(/.*\.(jpe?g|png|jpg)$/i)  
    const navigate = useNavigate();
    

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
                        navigate("/")
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
        userImage: undefined,
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {    
        const name = e.target.name; 
        if(e.target.type === "text") {
            setFormData({...formData, [name]:e.target.value});
        }
        if(e.target.type === "number") {
            setFormData({...formData, [name]:+e.target.value});
        }
        if (e.target.type === 'file' && e.target.files != null) {
            setFormData({ ...formData, [name]: e.target.files[0]});
            }
    }
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        console.log(formData)

        if(checkNames.test(formData.firstname)) {
            if(checkNames.test(formData.lastname)) {
                if(checkEmail.test(formData.email)) {
                    if(checkPassword.test(formData.password)) {
                        if(formData.userImage!=undefined && checkImg.test(formData.userImage?.name)) {
                            saveNewUserData(formData.firstname,formData.lastname,formData.email,formData.password,formData.userImage)
                            .then ((ok) => {
                                if (ok) {
                                    setRegisterModal(false)
                                    setErrorLoginMessage('')
                                    navigate("/")
                                } else {
                                    seterrorRegisterMessage(registerErrorServererror);
                                    setFormData({
                                    firstname: "", 
                                    lastname:"",
                                    email: "",
                                    password: "",
                                    userImage: undefined,
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
                <StyledH2>{t('loginMainheader')}</StyledH2>
                <StyledText>{t('loginMaintext')}</StyledText>
                <StyledLogin>{t('loginInnerMainheader')}</StyledLogin>
                <ErrorMassage>{errorLoginMessage}</ErrorMassage>
                <div className='loginView'>
                    <form onSubmit={handleLoginSubmit}>
                        <div>
                            <StyledText>{t('loginFormEmailText')}</StyledText>
                            <StyledTextInputHoleRow value={formLoginData.email} type='text' onChange={handleLoginChange} name='email'/>
                        </div>
                        <div>
                            <StyledText>{t('loginFormPasswordText')}</StyledText>
                            <StyledTextInputHoleRow value={formLoginData.password} type='text' onChange={handleLoginChange} name='password'/>
                        </div>
                        <StyledButtonRightsided>{t('loginFormBtnText')}</StyledButtonRightsided> 
                    </form>
                    <StyleH3Gold> {t('loginInfoResistrationText')} </StyleH3Gold>
                    <StyledButtonCenter onClick={goToRegister}>{t('loginRegisterBtnText')}</StyledButtonCenter>
                </div>
            </Modal>
            <Modal isOpen={showRegisterModal} style={customStyles}>
                <StyledH2>{t('loginMainheader')}</StyledH2>
                <StyledText> {t('loginMaintext')}</StyledText>
                <StyledRegistration> {t('registerInnerMainheader')}</StyledRegistration>
                <ErrorMassage>{errorRegisterMessage}</ErrorMassage>
                <form onSubmit={handleSubmit}>
                    <WrapperInputsTwoColum>
                        <div>
                            <div>
                                <StyledText>{t('registerFirstnameText')}</StyledText>
                                <StyledTextInputHoleRow value={formData.firstname} type='text' onChange={handleChange} name='firstname'/>    
                            </div>
                            <div>
                                <StyledText>{t('registerLastnameText')}</StyledText>
                                <StyledTextInputHoleRow value={formData.lastname} type='text' onChange={handleChange} name='lastname'/>
                            </div>  

                            <div>
                                <StyledText>{t('loginFormEmailText')}</StyledText>
                                <StyledTextInputHoleRow value={formData.email} type='text' onChange={handleChange} name='email'/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <StyledText>{t('loginFormPasswordText')}</StyledText>
                                <StyledTextInput value={formData.password} type='text' onChange={handleChange} name='password'/>
                            </div>
                    
                            <div>
                                <StyledText>{t('registerUserImgText')}</StyledText>
                                <StyledTextInput type='file' onChange={handleChange} name='userImage'/>
                            </div>
                        </div>
                    </WrapperInputsTwoColum>
                    <StyledButtonRightsided>{t('registerRegistrationbtnText')}</StyledButtonRightsided> 
                </form>          
            </Modal>
        </div>
    )
}