import React from "react";
import "./items.css";
import Card from "../components/Card";

const ItemsPage = ({ data }) => {
  return (
    <div className="container">
      {data &&
        data.map((product) => {
          return (
            <Card
              key={product.handle}
              id={product.handle}
              title={product.title}
              imageUrl={product.imageSrc}
              price={product.price}
              includes={product.products_included}
              scents={product.scents}
            />
          );
        })}
    </div>
  );
};

export default ItemsPage;
