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
  let is_service = null
  const router = useRouter()

if(data.getFurnaceByName(props.name))
{
  url = `/furnaces/${encodeURIComponent(props.name)}`
  is_furnace = true
  is_service = false
}
else if(data.getServiceByName(props.name))
{
  url = `/services/${encodeURIComponent(props.name)}`
  is_furnace = false
  is_service = true
}
else if(data.getSparePartByName(props.name))
{
  url = `/spare-parts/${encodeURIComponent(props.name)}`
  is_service = false
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
    // e.stopPropagation(); // Prevent card click when button is clicked
    const subject = `Quotation Request - ${props.name}`;
    if(is_furnace){
    const body = `Hello,\n\nI would like to request a quotation for the following furnace:\n\nFurnace: ${props.name}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
    const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    }
    else if(is_service){ 
      const body = `Hello,\n\nI would like to request a quotation for the following service:\n\nService: ${props.name}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
      const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_blank');
    }
    else{
      const body = `Hello,\n\nI would like to request a quotation for the following spare part:\n\nSpare Part: ${props.name}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
      const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_blank');
    }
  };
  return (
    <div className="card text-black w-96 shadow-sm bg-orange-50">
      <figure className="relative w-full h-64 bg-orange-50">
        <Image
          src={props.image}
          alt={props.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 384px"
          onClick={handleCardClick}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-orange-600">{props.name}</h2>
        <p>
            {props.specs} 
        </p>
                  <button
            onClick={() => handleGetQuotation(props.name)}
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
