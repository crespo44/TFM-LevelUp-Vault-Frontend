import './Button.css';

const Button = ({ type, text, onClick, className = '' }) => {
  return (
    <button type={type} className={`custom-button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;