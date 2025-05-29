import Link from 'next/link';
import { Mail } from 'lucide-react';
const Footer = () => (
  <footer className="bg-[#292929] text-white py-4 px-2 w-full fixed bottom-0 left-0 z-50">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
      {/* Email */}
      <div className="flex items-center space-x-2">
        <Mail />
        <Link href="mailto:forniengg@yahoo.com" className="hover:underline">
          forniengg@yahoo.com
        </Link>
      </div>
      {/* Phone */}
      <div className="flex items-center space-x-2">
        {/* Phone Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span>03004282482</span>
      </div>
      {/* Location */}
      <div className="flex items-center space-x-2">
        {/* Map Pin Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 21a2 2 0 01-2.828 0l-4.243-4.343a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>24 UpperMall Lahore</span>
      </div>
    </div>
  </footer>
);

export default Footer;