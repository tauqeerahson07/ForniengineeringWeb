"use client";
import { useContext, useState, useEffect } from "react";
import DataContext from "@/contexts/DataContext";
import Card from "@/components/Card";
import Link from "next/link";
import { getSignedUrl } from "@/lib/supabase";

export default function ClientHomePage({ initialData }) {
    const { furnaces, services, loading, error } = useContext(DataContext);
    const [displayData, setDisplayData] = useState(initialData);

    useEffect(() => {
    async function fetchSignedUrls() {
        if (!loading && (furnaces || services)) {
            const signedFurnaces = await Promise.all(
                (furnaces || initialData.furnaces).map(async (item) => {
                    const signedUrl = await getSignedUrl('forni-web-images', item.cover_image);
                    return { ...item, cover_image: signedUrl || item.cover_image };
                })
            );

            const signedServices = await Promise.all(
                (services || initialData.services).map(async (item) => {
                    const signedUrl = await getSignedUrl('forni-web-images', item.cover_image);
                    return { ...item, cover_image: signedUrl || item.cover_image };
                })
            );

            setDisplayData({
                furnaces: signedFurnaces,
                services: signedServices,
            });
        }
    }

    fetchSignedUrls();
}, [furnaces, services, loading, initialData]);

    const currentFurnaces = displayData.furnaces || [];
    const currentServices = displayData.services || [];

    return (
        <div className="bg-white min-h-screen">
            {/* Copy ALL your existing JSX from page.js here */}
            {/* Hero Section */}
            <div className="relative min-h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src='/webpage/forni_web_banner.jpg' 
                        className="w-full h-full object-cover object-center" 
                        alt="Forni Engineering Industrial Facility"
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                </div>
                
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
            </div>

            {/* Furnaces Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl">
                            {currentFurnaces.length > 0 ? (
                                currentFurnaces.slice(0, 6).map((item, index) => (
                                    <div 
                                        key={`furnace-${item.name}`}
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
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Our Services
                        </h2>
                        <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Discover our comprehensive heat treatment services
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl">
                            {currentServices.length > 0 ? (
                                currentServices.slice(0, 6).map((item, index) => (
                                    <div 
                                        key={`service-${item.s_id}`}
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
                                        No Services Available
                                    </h3>
                                    <p className="text-gray-500">
                                        We're currently updating our service catalog. Please check back soon.
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
                        <Link 
                            href='mailto:forniengg@yahoo.com' 
                            className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}