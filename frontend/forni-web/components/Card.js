import React from "react";

const Card = (props) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={props.image}
          alt={props.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>
            {props.specs}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Get Quotation</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
