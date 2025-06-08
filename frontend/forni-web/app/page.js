"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./globals.css";
import Card from "@/components/Card";

export default function Home() {
  const [data, setData] = useState(null);
  const videoref = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/furnaces/") // Django API URL
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    if (videoref.current) {
      videoref.current.playbackRate = 0.5;
    }
  }, [data]);
  if (!data) {
    return (
      <div className="bg-slate-100 w-screen h-screen flex">Loading...</div>
    );
  }
  return (
    <div className=" bg-white min-h-screen w-screen">
      <div className="hero min-h-screen relative overflow-hidden">
        <Image
          src="frontend\forni-web\public\webpage\forni_web_banner.png"
          alt="Banner"
          className="object-cover z-0 w-full h-full"
        />
        {/* Overlay and content as before */}
        <div className="hero-overlay z-10"></div>
        <div
          className="hero-content text-neutral-content text-center relative z-20 bg-transparent
        w-full rounded-full"
        >
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
            <p className="mb-5 text-xl">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn bg-orange-600 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
      {data.map((item) => (
        <Card
          name={item.name}
          specs={item.specification}
          image={item.image}
        ></Card>
      ))}
    </div>
  );
}
