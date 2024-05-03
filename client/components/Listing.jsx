import React, { useState } from 'react';
import zipRecruiterLogo from '../assets/images/zip.png';
import indeedLogo from '../assets/images/indeed.png';
import linkedinLogo from '../assets/images/Linkedin-Logo.wine.png';
import '../styles/searchList.css'

const Listing = (props) => {
  let logoImage = null;
  if (props.source === 'ZipRecruiter') {
    logoImage = zipRecruiterLogo; // Assign the imported image directly
  } else if (props.source === 'Linkedin') {
    logoImage = linkedinLogo;
  } else {
    logoImage = indeedLogo;
  }

  const handleSaveForLater = async (e) => {
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
    <div className="listItems">
      <b>{props.title} <b>@ </b>
      {props.company}
      </b>
      <li>
       <a className='buttonContainer'>
      <img width={100} height={100} src={logoImage} alt="logo" /> </a>
      
      <p>
      Salary: {props.salary}
      </p>
    
       <p>
          <div className='buttonContainer'>
          <button className="font-semibold rounded-full border bg-white p-2 hover:bg-blue-500 hover:text-white">
            Apply Now
          </button>
          <button
            className="font-semibold rounded-full border bg-white p-2 hover:bg-blue-500 hover:text-white"
            onClick={handleSaveForLater}
          >
            Save for Later
          </button>
          </div>
        </p>
      </li>
    </div>
  );
};

export default Listing;
