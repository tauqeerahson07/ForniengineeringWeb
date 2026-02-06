"use client";
import React, { useState, useEffect, useCallback, use } from "react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import Image from "next/image";

const ServiceDetailPage = () => {
  const pathname = usePathname();
  const name = pathname.split("/").pop();
  const decodedName = name ? decodeURIComponent(name) : "";
  const data = useContext(DataContext);
  const service = data.getserviceByName(decodedName);



  // State for slideshow images
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const generateImageList = () => {
    const images = [];
    if (service) {
      if (service.cover_image) {
        images.push({ image: service.cover_image, alt: `${service.name} - Cover Image` });
      }
      if (service.gallery_images && service.gallery_images.length > 0) {
        service.gallery_images.forEach((img, index) => {
          images.push({ image: img, alt: `${service.name} - Gallery Image ${index + 1}` });
        });
      }
    }
    return images;
  };

  const imagesList = generateImageList();
  useEffect(() => {
    setAllImages(imagesList);
    setCurrentImageIndex(0); // Reset to first image when service changes
  }, [service]);

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Loading state
  if (data.loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Not found state
  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            service Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The service {decodedName} could not be found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleGetQuotation = () => {
    const subject = `Quotation Request - ${service.name}`;
    const body = `Hello,\n\nI would like to request a quotation for the following service:\n\nservice: ${service.name}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
    const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Image Slideshow */}
          <div className="space-y-6">
            {/* Main Slideshow Container */}
            <div className="relative">
              {/* Main Image Display */}
              <div className="relative aspect-square bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {allImages.length > 0 ? (
                  <img
                    src={allImages[currentImageIndex].image}
                    alt={allImages[currentImageIndex].alt || `${service.name} - Image ${currentImageIndex + 1}`}
                    fill={true}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                )}

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      aria-label="Previous image"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      aria-label="Next image"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {service.name}
            </h1>
            <div className="grid grid-cols-1 gap-4">
              {service.feature && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Feature</h2>
                  <p className="text-gray-600">{service.feature}</p>
                </div>
              )}
              {service.specification && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Specifications</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.specification}
                  </ul>
                </div>
              )}
              <div>
                <button
                  onClick={handleGetQuotation}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Get Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;