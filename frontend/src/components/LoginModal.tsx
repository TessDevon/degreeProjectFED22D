import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { registerPerson } from '../models/PersonClass';


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
        //setShowLoginModal(false)
    }


    return (
        <div className= 'signView'>
            <button onClick={() => setShowLoginModal(true)}>Öppna loggin</button>
            <Modal isOpen={showLoginModal} style={customStyles}>
                <h1>Gå vidare för att ta del av vår unika minivärld!</h1>
                <p> Våra miniatyrvärldar är en inspirationssida för alla som samlar, renoverar och har docksåp som hobby. Här kan man få inspiration genom inlägg från användarna men även en möjlighet att köpa miniatyrer av andra användare eller sälja det man inte längre behöver.</p>
                <div className='loginView'>
                    <form onSubmit={handleSubmit}>
                        <input value={formData.firstname} type='text' onChange={handleChange} name='firstname'/>
                        <input value={formData.lastname} type='text' onChange={handleChange} name='lastname'/>
                        <input value={formData.email} type='text' onChange={handleChange} name='email'/>
                        <input value={formData.password} type='text' onChange={handleChange} name='password'/>
                        <input value={formData.userImage} type='img' onChange={handleChange} name='userImage'/>
                        <button>Logga in</button> 
                    </form>
                    <p>{JSON.stringify(formData)}</p>
                </div>
                <div className='registerView'>

                </div>
            </Modal>
            
            // Här ska läggas till loginfunktionen och om inloggning eller resistreing är okej med backend ska potalen stängas ner och sidan visas. 
        </div>
    )
}