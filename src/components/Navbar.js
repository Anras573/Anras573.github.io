import React from 'react';

function Navbar() {
  return (
    <nav className="h-14 fixed bg-gray-100 w-full z-50">
      <ul className="list-none m-0 p-0">
      <li className="float-left">
          <a href="#Home" className="block text-center p-4 hover:bg-gray-400 font-bold">Home</a>
        </li>
        <li className="float-left">
          <a href="#Experience" className="block text-center p-4 hover:bg-gray-400 font-bold">Experience</a>
        </li>
        <li className="float-left">
          <a href="#Skills" className="block text-center p-4 hover:bg-gray-400 font-bold">Skills</a>
        </li>
        <li className="float-left">
          <a href="#Education" className="block text-center p-4 hover:bg-gray-400 font-bold">Education</a>
        </li>
        <li className="float-left">
          <a href="#Certifications" className="block text-center p-4 hover:bg-gray-400 font-bold">Certifications</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
