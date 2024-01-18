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
    contentLabel="Example Modal"
    
    <button onClick={() => setShowLoginModal(true)}>Öppna loggin</button>
    <button onClick={() => setShowLoginModal(false)}>Logga in</button>*/

export default function LoginModal() {
    Modal.setAppElement('#root');
    const [showChatModal, setShowChatModal] = useState(false)
      


    return (
        <div className= 'signView'>
            <button onClick={() => setShowChatModal(true)}>Öppna loggin</button>
            <Modal isOpen={showChatModal} style={customStyles}>
                <h1>Användarchat</h1>
                <p> Chatta med utvald person</p>
            </Modal>
        </div>
    )
}