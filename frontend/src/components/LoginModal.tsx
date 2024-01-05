import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { loginPerson, registerPerson } from '../models/PersonClass';


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
        // Här ska koden granskas och respondera om något är fel. Om allt stämmer ska värdena skickas till servises och skickas till backenden.
        //setShowLoginModal(false)
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
        // Här ska koden granskas och respondera om något är fel. Om allt stämmer ska värdena skickas till servises och skickas till backenden.
        //setRegisterModal(false)
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
                        <input value={formLoginData.email} type='text' onChange={handleLoginChange} name='email'/>
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
                    <input value={formData.firstname} type='text' onChange={handleChange} name='firstname'/>
                    <input value={formData.lastname} type='text' onChange={handleChange} name='lastname'/>
                    <input value={formData.email} type='text' onChange={handleChange} name='email'/>
                    <input value={formData.password} type='text' onChange={handleChange} name='password'/>
                    <input value={formData.userImage} type='img' onChange={handleChange} name='userImage'/>
                    <button>Logga in</button> 
                </form>        
                <p>{JSON.stringify(formData)}</p>
            </Modal>
        </div>
    )
}