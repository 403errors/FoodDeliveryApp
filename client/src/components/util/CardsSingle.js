// CardsSingle.js

import React from "react";

function CardsSingle({item }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={item.imageURL} className="card-img-top" alt="Card" />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.price}</p>
       
      </div>
    </div>
  );
}

export default CardsSingle;
