import React from "react";

const Card = ({ title, genre, rating }) => (
    <div className="card">
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>Rating: {rating}</p>
    </div>
);

export default Card;
