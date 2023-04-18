import React from "react";
import Chip from "../Chip";
import "./card.css";
const Card = ({ id, title, imageUrl, price, includes, scents }) => {
  const renderChips = () => {
    if (scents) {
      return scents.map((color) => {
        return <Chip label={color} />;
      });
    }
  };

  const formatIncludedItems = () => {
    if (includes) {
      const formatted = includes
        .map((item) => item.replace("-", " "))
        .join(", ");
      return formatted;
    }
  };

  const formattedPrice = `$${(price / 100).toFixed(2)}`;

  return (
    <div className="product-card" id={id}>
      <div className="product-thumbnail">
        <img src={imageUrl} alt={id} />
      </div>
      <div className="product-details">
        <h4>{title}</h4>
        <div className="product-price">
          <small>$100.00</small>
          {formattedPrice}
        </div>
        <span className="product-category">
          {includes ? renderChips() : "No Category"}
        </span>
        <div className="product-includes">
          <h5>Includes:</h5>
          <p>{formatIncludedItems()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
