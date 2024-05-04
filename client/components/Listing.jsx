import React, { useState } from 'react';
import zipRecruiterLogo from '../assets/images/zip.png';
import indeedLogo from '../assets/images/indeed.png';
import linkedinLogo from '../assets/images/Linkedin-Logo.wine.png';
import '../styles/searchList.css'

const Listing = (props) => {
  let logoImage = null;
  let salary = "Salary: " + props.salary
  if(props.salary === "N/A" || props.salary === "Salary not found"){
    console.log("salary")
    salary = "Salary not available"
  }
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
      Job Description
      <p>
      {salary}
      </p>
    
       <p>
          <div className='buttonContainer'>
          <a href={props.apply} target="_blank" className="mb-4">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-50 hover:text-blue-500 p-5">
            Apply Now
          </button>
          </a>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-50 hover:text-blue-500 p-5"
            onClick={handleSaveForLater}
          >
            Save 
          </button>
          </div>
        </p>
      </li>
    </div>
  );
};

export default Listing;
