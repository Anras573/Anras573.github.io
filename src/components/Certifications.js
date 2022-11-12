import React from 'react';

import { certificationsData } from '../data/Certification'

function Certifications() {
  const certificationList = certificationsData.map((data) =>
  {
    return (
      <div key={data.title} className="w-full lg:w-1/2">
        <div className="bg-white rounded-md p-4 sm:mx-4 my-4 shadow-md">
          <span className="font-bold text-blue-400 text-sm tracking-wide">Issued {data.issuedAt}</span>
          <h1 className="text-2xl font-bold pt-1">{data.title}</h1>
          <h2 className="text-xl font-bold pt-1 italic">{data.issuer}</h2>
          { data.certificationLink &&
            <div>
              <a href={data.certificationLink} className="text-gray-600 italic">Certificate: <span className="cursor-pointer underline text-indigo-600">{data.certificationLink}</span></a>
            </div>
          }
        </div>
      </div>
    );
  });
  return (
    <article className="container mx-auto p-10">
      <div id="Certifications"></div>
      <div className="flex flex-wrap justify-items-center">
        {certificationList}
      </div>
    </article>
  );
}

export default Certifications;
