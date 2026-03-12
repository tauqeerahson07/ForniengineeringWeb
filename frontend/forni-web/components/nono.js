"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import DataContext from '@/contexts/DataContext';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { furnaces, services, loading, error } = useContext(DataContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Search functionality
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results = [];

    // Search furnaces
    if (furnaces) {
      furnaces.forEach(furnace => {
        if (furnace.name.toLowerCase().includes(query) || 
            furnace.specification?.toLowerCase().includes(query)) {
          results.push({
            type: 'furnace',
            name: furnace.name,
            description: furnace.specification,
            url: `/furnaces/${furnace.name}`
          });
        }
      });
    }

    // Search services
    if (services) {
      services.forEach(service => {
        if (service.name.toLowerCase().includes(query) || 
            service.description?.toLowerCase().includes(query)) {
          results.push({
            type: 'service',
            name: service.name,
            description: service.description,
            url: `/services/${service.name}`
          });
        }
      });
    }

    return results.slice(0, 6); // Limit to 6 results
  }, [searchQuery, furnaces, services]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <nav className="bg-white text-orange-600 fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-screen px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {/* Logo - Absolute Left */}
          <div className="absolute left-0">
            <Link href="/" className="flex items-center">
              <Image 
                width={60} 
                height={60} 
                src='/images/logo.png' 
                alt="Forni Engineering Logo"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-orange-600 hidden sm:block">
                Forni Engineering
              </span>
            </Link>
          </div>

          {/* All content positioned absolutely to the right */}
          <div className="absolute right-0 flex items-center">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex max-w-sm relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search furnaces, services..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => setShowSearchResults(searchQuery.trim().length > 0)}
                  className="w-full px-4 py-2 pl-10 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300 focus:bg-white outline-none transition-colors duration-200 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-300 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={result.url}
                          className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                          onClick={clearSearch}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              {result.type === 'furnace' ? (
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              ) : (
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">{result.name}</p>
                              <p className="text-xs text-gray-400 capitalize">{result.type}</p>
                              {result.description && (
                                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                                  {result.description.length > 80 
                                    ? `${result.description.substring(0, 80)}...` 
                                    : result.description
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-400 text-center">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About Us
              </Link>
              
              {/* Furnaces Dropdown */}
              <div className="relative group">
                <Link href={'/furnaces'}>
                <button className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200">
                  Furnaces
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                </Link>
                <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                  <div className="py-2">
                    <Link 
                      href="/furnaces" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium border-b border-gray-100"
                    >
                      View All Furnaces
                    </Link>
                    
                    {loading ? (
                      <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                    ) : furnaces && furnaces.length > 0 ? (
                      furnaces.slice(0, 6).map((furnace) => (
                        <Link
                          key={furnace.f_id}
                          href={`/furnaces/${furnace.name}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        >
                          {furnace.name.length > 30 
                            ? `${furnace.name.substring(0, 30)}...` 
                            : furnace.name
                          }
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">No furnaces available</div>
                    )}
                    
                    {furnaces && furnaces.length > 6 && (
                      <Link 
                        href="/furnaces" 
                        className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium border-t border-gray-100"
                      >
                        View More...
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <Link href='/services'>
                <button className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200">
                  Services
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                </Link>
                
                <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                  <div className="py-2">
                    <Link 
                      href="/services" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium border-b border-gray-100"
                    >
                      View All Services
                    </Link>
                    
                    {loading ? (
                      <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                    ) : services && services.length > 0 ? (
                      services.slice(0, 6).map((service) => (
                        <Link
                          key={service.s_id}
                          href={`/services/${service.name}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        >
                          {service.name.length > 30 
                            ? `${service.name.substring(0, 30)}...` 
                            : service.name
                          }
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">No services available</div>
                    )}
                    
                    {services && services.length > 6 && (
                      <Link 
                        href="/services" 
                        className="block px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium border-t border-gray-100"
                      >
                        View More...
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <Link 
                href="/contact" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-orange-600 p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {/* Mobile Search Bar */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search furnaces, services..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full px-4 py-2 pl-10 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300 focus:bg-white outline-none transition-colors duration-200 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-300 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Mobile Search Results */}
              {searchQuery.trim() && (
                <div className="mt-2 bg-gray-25 rounded-lg max-h-60 overflow-y-auto border border-gray-100">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={result.url}
                          className="block px-3 py-2 hover:bg-white rounded border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            clearSearch();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              {result.type === 'furnace' ? (
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              ) : (
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">{result.name}</p>
                              <p className="text-xs text-gray-400 capitalize">{result.type}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-400 text-center">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/about" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              
              <Link 
                href="/furnaces" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Furnaces
              </Link>
              
              <Link 
                href="/services" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-base font-medium bg-orange-600 text-white hover:bg-orange-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;