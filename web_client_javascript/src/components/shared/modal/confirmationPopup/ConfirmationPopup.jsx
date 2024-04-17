import "./popupStyle.css";
const ConfirmationPopup = ({ setOpenModal, setIsOpen }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal-title">
          <h1>Are you sure?</h1>
          <p>You cannot revert this later!</p>
        </div>
        <div className="modal-footer">
          <div>
            <button
              className="cancel-btn btn"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
          <div>
            <button className="close-btn btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
