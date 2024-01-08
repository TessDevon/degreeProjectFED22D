import { ChangeEvent, FormEvent, useState } from 'react';
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
  
export default function LoginModal() {
    Modal.setAppElement('#root');
    const [showLoginModal, setShowLoginModal] = useState(true)
    const [showRegisterModal, setRegisterModal] = useState(false)
    const checkNames = new RegExp(/^[a-zA-ZåäöÅÄÖ ,.'-]+$/i);
    const checkEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const checkPassword = new RegExp(/^(?=.*[A-ZÅÄÖa-zåäö])(?=.*\d)[A-ZÅÄÖa-zåäö\d]{8,}$/)
    // Kräver inlogging med minst en stor boksav och siffra, minst 6 tecken och inga mellanslag. 
    const checkImg = new RegExp(/\.(jpe?g|png|gif|bmp)$/i)  
    

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
        console.log(formLoginData)
        if(checkEmail.test(formLoginData.email)) {
            if(checkPassword.test(formLoginData.password)) {
                LoginUser(formLoginData.email,formLoginData.password)
                setShowLoginModal(false)
            } else {
                console.log('lösenord felaktigt ifyllt')
            }
        } else {
            console.log('email är fel ifyllt')
        }
    }

    function goToRegister () {
        setShowLoginModal(false);
        setRegisterModal(true);
    }

    
    ///////////////////// Handle new user//////////////////////

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
        console.log(formData)

        if(checkNames.test(formData.firstname)) {
            if(checkNames.test(formData.lastname)) {
                if(checkEmail.test(formData.email)) {
                    if(checkPassword.test(formData.password)) {
                        if(checkImg.test(formData.userImage)) {
                            saveNewUserData(formData.firstname,formData.lastname,formData.email,formData.password,formData.userImage)
                            setRegisterModal(false)
                        } else {
                            console.log('img går ej att spara')
                        }
                    } else {
                        console.log('lösenord felaktigt ifyllt')
                    }
                } else {
                    console.log('email är fel ifyllt')
                }
            } else {
                console.log('efternamnet är fel ifyllt')
            }
        } else {
            console.log('förnamn fel ifyllt')
        }
    }

    return (
        <div className= 'signView'>
            <button onClick={() => setShowLoginModal(true)}>Öppna loggin</button>
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
                    <button onClick={goToRegister}>Registrera dig som ny användare</button>
                    <p>{JSON.stringify(formLoginData)}</p>
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
                    <button>Logga in</button> 
                </form>        
                <p>{JSON.stringify(formData)}</p>
            </Modal>
        </div>
    )
}