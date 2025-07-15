import React from "react";

const Card = (props) => {
  console.log(props)
  return (
    <div className="card text-black w-96 shadow-sm">
      <figure>
        <img
          src={props.image}
          alt={props.name}
          width={256}
          height={256}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-orange-600">{props.name}</h2>
        <p>
            {props.specs}
        </p>
        <div className="card-actions justify-end">
          <button className="btn bg-orange-600 border-orange-600">Get Quotation</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
