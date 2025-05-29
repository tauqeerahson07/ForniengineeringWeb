"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Product() {
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
    <div className='bg-slate-100 w-screen h-screen flex '>
      <div className='mt-24 space-y-5'>
        {data.map((item) => (
          <article key={item.f_id} className='flex items-start ml-10 bg-orange-400 rounded-2xl w-full max-w-full'>
            <section className='mr-4'>
              <Image src={item.image} alt={item.name} width={221} height={230} className='rounded-2xl' />
            </section>
            <section>
              <h2 className='text-2xl font-bold uppercase'>{item.name}</h2>
              <p className='text-lg'>{item.feature}</p>
              <p className='text-lg'>{item.specification}</p>
            </section>
          </article>
        ))}
      </div>
    </div>
  );
}