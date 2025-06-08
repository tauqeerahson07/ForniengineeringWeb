
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
  <div className=" bg-white text-orange-600 fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur flex items-center px-8 py-2">
  <div className="navbar-start space-x-4 ">
    <a>
      <Image width={80} height={80} src='/images/logo.png'></Image>
    </a>
    <ul className="menu menu-horizontal px-1 text-3xl space-x-4 w-full" >
      <li>
        About Us
      </li>
    <li className="relative group">
  Furnaces
  <ul className="absolute left-0 top-full mt-2 min-w-[10rem] bg-white text-orange-600 rounded shadow-lg z-50 hidden group-hover:block">
    <li className="px-4 py-2 hover:bg-orange-100">Submenu 1</li>
    <li className="px-4 py-2 hover:bg-orange-100">Submenu 2</li>
  </ul>
</li>
      <li>Item 3</li>
    </ul>
  </div>
  <div className="navbar-end">
    <div className='space-x-6'>
    <a className="btn bg-orange-600 border-0">SignUp</a>
    <a className="btn bg-white text-orange-600 border-0">Login</a>
    </div>
   </div>
</div>
  );
};

export default Navbar;
