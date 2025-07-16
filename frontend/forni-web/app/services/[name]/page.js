"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import Image from "next/image";

const serviceDetailPage = () => {
  const pathname = usePathname();
  const name = pathname.split("/").pop();
  const decodedName = name ? decodeURIComponent(name) : "";
  const data = useContext(DataContext);
  const service = data.getServiceByName(decodedName)
  console.log(service)
  
  // Slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prepare all images for slideshow
  const allImages = service ? [
    ...(service.cover_image ? [{ image: service.cover_image, alt: `${service.name} - Cover Image` }] : []),
    ...(service.gallery_images || [])
  ] : [];

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
            The service "{decodedName}" could not be found.
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
                  <Image
                    src={allImages[currentImageIndex].image}
                    alt={allImages[currentImageIndex].alt || `${service.name} - Image ${currentImageIndex + 1}`}
                    fill
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

              {/* Thumbnail Navigation */}
              {allImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-orange-600 ring-2 ring-orange-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-orange-600 text-white text-xs px-1 rounded">
                          Main
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Dot Indicators (Alternative to thumbnails for smaller screens) */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4 sm:hidden">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'bg-orange-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {service.name}
              </h1>
            </div>

            {/* Features Section */}
            {service.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )}

            {/* Specifications Section */}
            {/* {service.specification && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Specifications
                </h2>
                <div className="space-y-3">
                  {service.specification.split('\n').map((spec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2"></span>
                      <p className="text-gray-700">{spec.trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Get Quotation Button */}
            <div className="pt-6">
              <button
                onClick={handleGetQuotation}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Get Quotation
              </button>
            </div>
          </div>
        </div>

        {/* Back to services Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => window.history.back()}
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to services
          </button>
        </div>
      </div>
    </div>
  );
};

export default serviceDetailPage;