"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';

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
    <div className='bg-slate-100 w-screen h-screen'>
      <div className='mt-24'>
        {data.map((item) => {
          return <Card name={item.name} feature={item.feature} specs={item.specs} image = {item.image}></Card>
      })}
      </div>
    </div>
  );
}