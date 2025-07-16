"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DataContext from '@/contexts/DataContext';
import { useRouter } from 'next/navigation';
const Furnaces = () => {
  const { furnaces, loading, error } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const router = useRouter()
  // Filter and sort furnaces
  const filteredAndSortedFurnaces = React.useMemo(() => {
    if (!furnaces) return [];

    let filtered = furnaces;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = furnaces.filter(furnace => 
        furnace.name.toLowerCase().includes(query) ||
        furnace.specification?.toLowerCase().includes(query)
      );
    }

    // Sort furnaces
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'latest':
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        default:
          return 0;
      }
    });
  }, [furnaces, searchQuery, sortBy]);

  const handleGetQuotation = (furnaceId, furnaceName) => {
    // You can customize this to open a modal, redirect to a form, etc.
    const subject = `Quotation Request - ${furnaceName}`;
    const body = `Hello,\n\nI would like to request a quotation for the following furnace:\n\nFurnace: ${furnaceName}\n\nPlease provide detailed pricing, specifications, and delivery information.\n\nThank you.`;
    const mailtoUrl = `mailto:forniengg@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading furnaces...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Furnaces</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Furnace Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality industrial furnaces designed for various applications and industries.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search furnaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" bg-gray-50 w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 text-black border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="name">Name</option>
                <option value="latest">Latest</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {filteredAndSortedFurnaces.length} furnace{filteredAndSortedFurnaces.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Furnaces Grid */}
        {filteredAndSortedFurnaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No furnaces found</h3>
              <p className="text-gray-600">
                {searchQuery.trim() 
                  ? `No furnaces match your search "${searchQuery}"`
                  : "No furnaces available at the moment"
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedFurnaces.map((furnace) => (
    <div
      key={furnace.f_id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {/* Furnace Image */}
      <div className="relative h-48 bg-gray-100">
        {furnace.cover_image ? (
          <Image
            src={furnace.cover_image}
            alt={furnace.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        )}
        
        {/* View Details Link */}
        <Link
          href={`/furnaces/${encodeURIComponent(furnace.name)}`}
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100"
        >
          <span className="text-white font-medium bg-black bg-opacity-50 px-3 py-1 rounded-md">
            View Details
          </span>
        </Link>
      </div>

      {/* Furnace Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {furnace.name}
        </h3>
        
        {furnace.specification && (
          <p className="text-sm text-gray-600 mb-4">
            {furnace.specification.length > 120 
              ? `${furnace.specification.substring(0, 120)}...` 
              : furnace.specification
            }
          </p>
        )}

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {furnace.price && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700">Price:</span>
              <span className="ml-2 text-orange-600 font-semibold">{furnace.price}</span>
            </div>
          )}
          
          {furnace.category && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700">Category:</span>
              <span className="ml-2 text-gray-600">{furnace.category}</span>
            </div>
          )}
          
          {furnace.model && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700">Model:</span>
              <span className="ml-2 text-gray-600">{furnace.model}</span>
            </div>
          )}
          
          {furnace.capacity && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700">Capacity:</span>
              <span className="ml-2 text-gray-600">{furnace.capacity}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleGetQuotation(furnace.f_id, furnace.name)}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Get Quotation
          </button>
          
          <Link
            href={`/furnaces/${encodeURIComponent(furnace.name)}`}
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  ))}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-12 bg-orange-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Furnace?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Our team of experts can design and manufacture custom furnaces tailored to your specific requirements.
          </p>
          <Link
            href="mailto:forniengg@yahoo.com"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Furnaces;