import { useState } from "react";
import "./StarsInput.css";

const StarsInput = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className="star-rating-input">
      {[1, 2, 3, 4, 5].map((val) => (
        <span
          key={`star-${val}`}
          onClick={() => setRating(val)}
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