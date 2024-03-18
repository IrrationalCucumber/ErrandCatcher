import React from "react";
import "./modal.css";

const Modal = ({ onSubmit, onCancel, closeModal, children }) => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")
          closeModal("Modal was closed");
      }}
    >
      <div className="modal">
        <div
          className="modal-header"
          onClick={() => closeModal("Modal was closed")}
        >
          <p className="close">&times;</p>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-submit"
            onClick={onSubmit}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

//use of modal in other pages
// const [showModal, setShowModal] = useState(false);

// const handleSubmit = () => {
//   console.log("Submit button was clicked");
//   // Perform submit action here
// };

// const handleCancel = () => {
//   console.log("Cancel button was clicked");
//   // Perform cancel action here
//   setShowModal(false);
// };

// const handleCloseModal = () => {
//   console.log("Modal was closed");
//   // Perform close modal action here
//   setShowModal(false);
// };

// return (
//   <div>
//     <button onClick={() => setShowModal(true)}>Show Modal</button>
//     {showModal && (
//       <Modal
//         onSubmit={handleSubmit}
//         onCancel={handleCancel}
//         closeModal={handleCloseModal}
//       >
//         {/* Modal Content Goes Here */}
//       </Modal>
//     )}
//   </div>
// );
// };