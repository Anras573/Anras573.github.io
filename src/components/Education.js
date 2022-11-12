import React from 'react';

function Education() {
  return (
    <article className="container mx-auto ml:bg-white rounded p-10 m-10 relative px-6 flex flex-col space-y-8">
      <div id="Education" className=""></div>
      <div className="absolute z-0 w-2 h-full bg-white shadow-md inset-0 left-17 md:mx-auto md:right-0 md:left-0"></div>
      <div className="relative z-10">
        <div className="h-24 w-24 bg-white rounded-full shadow-md border-4 border-white xs:absolute md:mx-auto md:left-0 md:right-0 flex justify-center items-center">
          <span className="font-bold text-xl text-blue-400">2015</span>
        </div>
        <div className="relative pt-2 xs:pl-28 xs:pt-0 md:w-1/2 md:ml-0 md:mr-auto md:pl-0 md:pr-16">
          <div className="bg-white p-6 rounded-md shadow-md">
            <span className="font-bold text-blue-400 text-sm tracking-wide">2015 - 2016</span>
            <h1 className="text-2xl font-bold pt-1">Bachelor of Software Development</h1>
            <h2 className="text-xl font-bold pt-1 italic">Erhvervsakademiet Lillebælt</h2>
            <p className="pt-1">
              To qualify graduates to function independently as IT specialists with a focus on integration and architecture
              and to engage in technical cooperation for the development of large, data-intensive distributed IT systems in IT companies,
              IT consultancies or internal IT development departments.
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="h-24 w-24 bg-white rounded-full shadow-md border-4 border-white xs:absolute md:mx-auto md:left-0 md:right-0 flex justify-center items-center">
          <span className="font-bold text-xl text-blue-400">2012</span>
        </div>
        <div className="relative pt-2 xs:pl-28 xs:pt-0 md:w-1/2 md:ml-auto md:pl-16">
          <div className="bg-white p-6 rounded-md shadow-md">
            <span className="font-bold text-blue-400 text-sm tracking-wide">2012 - 2015</span>
            <h1 className="text-2xl font-bold pt-1">Academy Profession Graduate in Computer Science</h1>
            <h2 className="text-xl font-bold pt-1 italic">Erhvervsakademiet Sjælland</h2>
            <p className="pt-1">
              The purpose of the vocational programme in information technology is to qualify graduates to independently undertake work analysing,
              planning and implementing solutions related to new development, further development and integration of IT systems in private and
              public companies domestically and internationally.
            </p>
            <p className="pt-1 italic">
              Specialized in Neural Networks and Game Programming.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Education;
