"use client";
import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import DataContext from '@/contexts/DataContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { furnaces, services, loading } = useContext(DataContext);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {/* Navigation Links */}
          <div className="space-y-6">
            {/* About */}
            <div>
              <Link 
                href="/about"
                className="block text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors duration-200"
                onClick={onClose}
              >
                About Us
              </Link>
            </div>

            {/* Furnaces Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Furnaces</h3>
              <div className="space-y-2 pl-4">
                <Link 
                  href="/furnaces"
                  className="block text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                  onClick={onClose}
                >
                  View All Furnaces
                </Link>
                
                {loading ? (
                  <div className="text-sm text-gray-500">Loading...</div>
                ) : furnaces && furnaces.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {furnaces.slice(0, 8).map((furnace) => (
                      <Link
                        key={furnace.f_id}
                        href={`/furnaces/${furnace.name}`}
                        className="block text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200"
                        onClick={onClose}
                      >
                        {furnace.name.length > 35 
                          ? `${furnace.name.substring(0, 35)}...` 
                          : furnace.name
                        }
                      </Link>
                    ))}
                    {furnaces.length > 8 && (
                      <Link 
                        href="/furnaces"
                        className="block text-sm text-orange-600 hover:text-orange-700 font-medium"
                        onClick={onClose}
                      >
                        + {furnaces.length - 8} more...
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No furnaces available</div>
                )}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Services</h3>
              <div className="space-y-2 pl-4">
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <Link
                      key={service.s_id}
                      href={`/services/${service.name}`}
                      className="block text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200"
                      onClick={onClose}
                    >
                      {service.name}
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No services available yet</div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="pt-4 border-t border-gray-200">
              <Link 
                href="/contact"
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                onClick={onClose}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;