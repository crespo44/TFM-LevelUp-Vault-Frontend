import './Button.css';

const Button = ({ type, text, onClick, className = '', disabled = false }) => {
  return (
    <button type={type} className={`custom-button ${className}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;