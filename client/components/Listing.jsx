import React, { useState } from 'react';
import zipRecruiterLogo from '../assets/images/zip.png';
import indeedLogo from '../assets/images/indeed.png';
import linkedinLogo from '../assets/images/Linkedin-Logo.wine.png';

const Listing = props => {
  let logoImage = null;
  if (props.source === 'ZipRecruiter') {
    logoImage = zipRecruiterLogo; // Assign the imported image directly
  } else if (props.source === 'Linkedin') {
    logoImage = linkedinLogo;
  } else {
    logoImage = indeedLogo;
  }

  const handleSaveForLater = async e => {
    e.preventDefault();
    console.log('SAVE');

    try {
      const savedJob = await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: props.title,
          company: props.company,
          salary: props.salary,
          apply: props.apply,
        }),
      });
    } catch (error) {
      console.log('Error saving the job position:', error);
    }
  };

  return (
    <div className="bg-blue-300 border border-gray-400 w-[95%] flex justify-center items-center flex-col rounded-2xl mb-5 shadow-lg">
      <label className="font-bold text-lg pt-4 text-wrap px-4 text-center">
        {props.title}
      </label>
      <br />
      <label className="text-md font-semibold text-white">
        {props.company}
      </label>
      <br />
      <label className="text-md text-white">Salary: {props.salary}</label>
      <br />
      <img className="w-auto h-8 mr-2 mb-4" src={logoImage} alt="Logo" />{' '}
      {/* Render the image */}
      {/* <form action={props.apply} target="_blank" className="mb-4"> */}
      <a href={props.apply} target="_blank" className="mb-4">
        <button className="font-semibold rounded-full border bg-white p-2 hover:bg-blue-500 hover:text-white">
          Apply Now
        </button>
      </a>
      <button
        className="font-semibold rounded-full border bg-white p-2 hover:bg-blue-500 hover:text-white"
        onClick={handleSaveForLater}
      >
        Save for Later
      </button>
      {/* </form> */}
    </div>
  );
};

export default Listing;
