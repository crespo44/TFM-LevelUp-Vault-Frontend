import Button from "../Buttons/Button";  
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close">
          <Button type="button" className="btn-close" text="❌" onClick={onClose}/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;