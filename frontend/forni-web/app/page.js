"use client";
import Image from "next/image";
import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import "./globals.css";
import Card from "@/components/Card";
import Link from "next/link";
export default function Home() {
  const { furnaces, services, loading, error } = useContext(DataContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-orange-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <div className="text-2xl font-bold text-red-600 mb-4">⚠️ Error</div>
          <div className="text-lg text-gray-700">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src='/webpage/forni_web_banner.jpg' 
            className="w-full h-full object-cover object-center" 
            alt="Banner"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to 
                <span className="block text-orange-400">Forni Engineering</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                Engineering excellence in industrial furnace solutions. We design, 
                manufacture, and maintain high-performance furnaces for various industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center inline-block"
                >
                  Learn More
                </Link>
              </div>

            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Furnaces Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Our Furnace Solutions
      </h2>
      <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Discover our range of high-quality industrial furnaces designed for 
        maximum efficiency and reliability across various applications.
      </p>
    </div>

    {/* Centered Furnaces Grid Container */}
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl">
        {furnaces?.length > 0 ? (
          furnaces.map((item, index) => (
            <div 
              key={item.f_id}
              className="transform hover:scale-105 transition-all duration-300 flex justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                name={item.name}
                specs={item.specification}
                image={item.cover_image}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🏭</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Furnaces Available
            </h3>
            <p className="text-gray-500">
              We're currently updating our product catalog. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
{/* Services Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Our Services
      </h2>
      <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Discover few of the heat treatment service we provide
      </p>
    </div>

    {/* Centered Furnaces Grid Container */}
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl">
        {services?.length > 0 ? (
          services.map((item, index) => (
            <div 
              key={item.s_id}
              className="transform hover:scale-105 transition-all duration-300 flex justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                name={item.name}
                specs={item.description}
                image={item.cover_image}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Service Available
            </h3>
            <p className="text-gray-500">
              We're currently updating our product catalog. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your industrial furnace requirements 
            and get a customized solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href='mailto:forniengg@yahoo.com' className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Us
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}