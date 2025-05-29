import "./StarsInput.css";

const StarsInput = ({ rating, onChange }) => {
  const handleClick = (val) => {
    onChange(val); 
  };
  return (
    <div className="star-rating-input">
      {[1, 2, 3, 4, 5].map((val) => (
        <span
          key={`star-${val}`}
          onClick={() => handleClick(val)}
          className={val <= rating ? 'star filled' : 'star'}
          role="button"
          aria-label={`Estrella ${val}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarsInput;