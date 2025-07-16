"use client"
import React from "react";
import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import { useRouter } from "next/navigation";
const Card = (props) => {
  const data = useContext(DataContext)
  let url = null
  let is_furnace = null
  const router = useRouter()
  if(data.getFurnaceByName(props.name))
  {
    url = `/furnaces/${props.name}`
    is_furnace = true
  }
  if(data.getServiceByName(props.name))
  {
    url = `/services/${props.name}`
    is_furnace = false
  }
  // Handle navigation
  const handleCardClick = () => {
    if (url) {
      router.push(url);
    }
  };

  // Handle get quotation
  const handleGetQuotation = (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    const subject = `Quotation Request - ${props.name}`;
    if(is_furnace){
    const body = `Hello,\n\nI would like to request a quotation for:\n\nProduct: ${props.name}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
    const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    }
    else{
    const body = `Hello,\n\nI would like to request a quotation for:\n\nService: ${props.name}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
    const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    }
  };
  return (
    <div className="card text-black w-96 shadow-sm">
      <figure>
        <img
          src={props.image}
          alt={props.name}
          width={256}
          height={256}
          onClick={handleCardClick}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-orange-600">{props.name}</h2>
        <p>
            {props.specs}
        </p>
        <div className="card-actions justify-end">
          <button className="btn bg-orange-600 border-orange-600" onClick={handleGetQuotation}>Get Quotation</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
