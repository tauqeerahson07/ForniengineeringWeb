
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "Gas Carburizing Furnaces in Pakistan | Forni Engineering",
  description: "Pakistan's leading pioneer in gas carburizing furnace technology. We manufacture high-performance carburizing furnaces for automotive, aerospace, and industrial heat treatment.",
  keywords: "gas carburizing furnaces Pakistan, carburizing furnace manufacturer, controlled atmosphere furnace, heat treatment furnace Pakistan",
  openGraph: {
    title: "Gas Carburizing Furnaces in Pakistan | Forni Engineering",
    description: "Pakistan's pioneering manufacturer of gas carburizing furnaces and controlled atmosphere heat treatment systems.",
    url: "https://forniengineering.com/about",
    type: "website",
  },
};

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Forni Engineering
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto">
              Pakistan&apos;s Pioneer in Advanced heat treatment furnace technology. Manufacturers of Gas Carburizing, Nitriding, Nitro Carburizing, Normalizing furnaces.
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center w-screen leading-relaxed">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Forni Engineering stands as Pakistan&apos;s pioneering leader in advanced heat treatment furnace technology. 
                Since our inception, we have been instrumental in establishing and advancing the industrial furnace 
                industry in Pakistan by introducing world-class technology and expertise in gas carburizing, nitriding, 
                nitro carburizing, normalizing, and tempering furnaces.
                As the first and foremost innovator in controlled atmosphere furnace systems in Pakistan, we have set the industry 
                standard for design, manufacturing, and maintenance of high-performance heat treatment equipment. 
              </p>
              <p>
                Our commitment to technological excellence and continuous innovation has made us the trusted partner 
                for businesses across Pakistan and beyond. From pioneering installations to ongoing technical support, 
                we deliver engineering solutions that reflect our legacy of being the industry&apos;s true innovators in 
                advanced heat treatment furnace technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*Client List */}
      <div className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
        Trusted by industry leaders
      </p>
      <h2 className="text-3xl font-bold text-gray-900">
        Some of Our Valuable Clients
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-50 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Pakistan Aeronautical Complex</p>
        <p className="text-md text-gray-400 mt-1">Kamra</p>
      </div>
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">GIK Institute of Engineering</p>
        <p className="text-md text-gray-400 mt-1">Topi</p>
      </div>
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Pakistan Heavy Industry</p>
        <p className="text-md text-gray-400 mt-1">Taxila</p>
      </div>
      <div className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Millat Tractors</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Mannan Shahid Forgings</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Mistequay International</p>
        <p className="text-md text-gray-400 mt-1">Faisalabad</p>
      </div>
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Mapro Industries</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
      <div className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Fabman Engineers</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
      <div className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Al-Mustafa Engineers</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
      <div className="p-6 border-gray-100 border-r hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Mecas Engineering</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
      <div className="p-6 border-gray-100 border-r hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Kortech Radiators</p>
        <p className="text-md text-gray-400 mt-1">Lahore</p>
      </div>
        <div className="p-6 border-gray-100 border-r hover:bg-gray-50 transition-colors duration-150">
        <p className="text-lg font-semibold text-gray-900">Innoviatech Industries</p>
        <p className="text-md text-gray-400 mt-1">Taxila</p>
      </div>
    </div>
  </div>
</div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Driving innovation in industrial heating solutions while maintaining the highest standards of quality and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-orange-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To lead Pakistan&apos;s industrial heat treatment sector through pioneering innovations in controlled atmosphere and conventional
                furnace technology. We are committed to providing cutting edge solutions that empower Pakistani 
                industries to achieve world class precision, efficiency, and quality. Our mission is to continuously advance 
                the science and engineering of controlled atmosphere furnaces while delivering exceptional value and support 
                to every client.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                To establish Forni Engineering as the globally recognized authority in in controlled atmosphere and conventional furnace 
                technology, building upon our pioneering legacy in Pakistan. We envision a future where our innovations 
                in controlled atmosphere furnaces enable Pakistani industries to compete at the highest international 
                standards, contributing to sustainable industrial growth and technological advancement across the region 
                and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Location */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Location
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our state of the art facility where innovation meets precision manufacturing
            </p>
          </div>

          <div className="flex flex-col items-center">
            {/* Contact Information */}
            <div className="space-y-8 w-full max-w-3xl px-4">
              <div className=" flex bg-gray-50 rounded-lg p-8 flex-col items-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-orange-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        24 Upper Mall<br />
                        Lahore,Punjab
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-orange-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+923004282482</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-orange-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">forniengg@yahoo.com</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-orange-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us Today
                </Link>
              </div>
            </div>

            {/* Map */}
{/* <div className="rounded-lg h-96 overflow-hidden shadow-lg">
  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d212.5044563860782!2d74.35722148945005!3d31.549657744386245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1779968180029!5m2!1sen!2sus" 
  width="600" 
  height="450" 
  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
</div> */}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-orange-100 text-lg">Numbers that speak to our commitment and expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-orange-200">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-orange-200">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-200">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-orange-200">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default About;