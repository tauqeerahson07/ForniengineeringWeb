"use client"
import Image from "next/image";
import { useEffect, useState } from 'react';
import './globals.css'

export default function Home() {
  const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch("http://127.0.0.1:8080/api/furnaces/") // Django API URL
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    }, []);
  
    if (!data) {
      return <div className='bg-slate-100 w-screen h-screen flex'>Loading...</div>;
    }
  return (
    <div className=" bg-slate-100  h-screen w-screen">
       <div className="flex flex-col pt-28 w-screen justify-center items-center h-full">
        <p className="text-center text-orange-500 text-4xl font-bold animate-moveUp delay-150">Welcome to Forni Engineering</p>
      <div className="flex w-1/2 animate-showUp delay-150 bg-slate-50 pt-5 rounded-2xl">
        <p className= "text-orange-500 font-semibold text-3xl -mt-2 ml-5"> Products </p>
        {
        data.map((item) => (
          <div className="flex w-screen mr-5 mt-16 drop-shadow-xl pt-5">
          <article key={item.f_id} >
            <Image src={item.image} width={221} height={230} alt={item.name} className = "rounded-xl mb-4"/>
            <section>
              <p className="text-black text-center">{item.name}</p>
            </section>

          </article>
      </div>
        ))
      }
      </div>
      </div>
      </div>
  );
}
