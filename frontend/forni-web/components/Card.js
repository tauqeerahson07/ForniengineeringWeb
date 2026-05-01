"use client"
import React from "react";
import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
        <Image
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
                  <button
            onClick={() => handleGetQuotation(service.name)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Get Quotation
          </button>
      </div>
    </div>
  );
};

export default Card;
