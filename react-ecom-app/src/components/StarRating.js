import { useState, useEffect } from "react";

const StarRating = ({ rating, className }) => {

    const [stars, setStars] = useState([]);

    useEffect(() => {
        setStars(() => {
          const filledStars = [];
          for (let i = 0; i < 5; i++) {
            filledStars.push(<span className={className} key={i} style={{ color: i < rating ? 'gold' : 'gray' }}>&#9733;</span>);
          }
          return filledStars;
        });
      }, [rating]);
    return(
        <div>
            {stars}
        </div>
    );
    
};


export default StarRating;