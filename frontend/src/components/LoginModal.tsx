import { useState } from 'react';
import Modal from 'react-modal';


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

  /*
  Settings for other modals like chatt
    //Två nästkommande rader för att stänga rutan om man trycker utanför.
    shouldCloseOnEsc={true}
    onRequestClose={() => setShowLoginModal(false)}
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    style={customStyles}
    contentLabel="Example Modal"*/

export default function LoginModal() {
    Modal.setAppElement('#root');
    const [showLoginModal, setShowLoginModal] = useState(true)

    return (
        <div className= "loginView">
            <button onClick={() => setShowLoginModal(true)}>Öppna loggin</button>
            <Modal isOpen={showLoginModal} style={customStyles}>
                <h1>Gå vidare för att ta del av vår unika minivärld!</h1>
                <p> Våra miniatyrvärldar är en inspirationssida för alla som samlar, renoverar och har docksåp som hobby. Här kan man få inspiration genom inlägg från användarna men även en möjlighet att köpa miniatyrer av andra användare eller sälja det man inte längre behöver.</p>
                <button onClick={() => setShowLoginModal(false)}>Logga in</button> 
            </Modal>
            
            // Här ska läggas till loginfunktionen och om inloggning eller resistreing är okej med backend ska potalen stängas ner och sidan visas. 
        </div>
    )
}