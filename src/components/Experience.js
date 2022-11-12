import React from 'react';

import { experienceData } from '../data/Experience';

function Experience() {
  const experience = experienceData.map((experience, index) => {
    const containerCss = index % 2 === 0
      ? 'md:ml-0 md:mr-auto md:pl-0 md:pr-16'
      : 'md:ml-auto md:pl-16';

    return (
      <div key={experience.occupancy} className="relative z-10">
        <div className="h-24 w-24 bg-white rounded-full shadow-md border-4 border-white xs:absolute md:mx-auto md:left-0 md:right-0 flex justify-center items-center">
          <span className="font-bold text-xl text-blue-400">{experience.startYear}</span>
        </div>
        <div className={`relative pt-2 xs:pl-28 xs:pt-0 md:w-1/2 ${containerCss}`}>
          <div className="bg-white p-6 rounded-md shadow-md">
            <span className="font-bold text-blue-400 text-sm tracking-wide">{experience.occupancy}</span>
            <h1 className="text-2xl font-bold pt-1">{experience.workplace}</h1>
            <h2 className="text-xl font-bold pt-1 italic">{experience.title}</h2>
            <p className="pt-1">
              During my internship at Autobutler, I was responsible for developing a benefit-system, allowing the car owners to see the benefits they get from other companies, by being part of Autobutler.
              The entire system was developed using Ruby on Rails and PostgreSQL for the backend. Everything was tested using RSpec.
              The frontend was build using SASS, Bootstrap, and jQuery.
            </p>
          </div>
        </div>
      </div>
    );
  });

  return(
    <article className="container mx-auto ml:bg-white rounded p-10 m-10 relative px-6 flex flex-col space-y-8">
      <div id="Experience" className=""></div>
      <div className="absolute z-0 w-2 h-full bg-white shadow-md inset-0 left-17 md:mx-auto md:right-0 md:left-0"></div>
      {experience}
    </article>
  );
}

export default Experience;
