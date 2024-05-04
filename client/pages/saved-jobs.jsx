import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/wobbe_mascot2.png';
import profilePic from '../assets/wobbe_mascot_profile.png';

function SavedJobs(props) {
  const [savedJobs, setSavedJobs] = useState([]);

  // const navigate = useNavigate();
  console.log('savedJobs', savedJobs);

  
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`/savedjobs/data`, {
          credentials: 'include',
        });
        console.log('response', response);
        if (response.status === 403) {
          throw new Error('Failed to fetch saved jobs');
        }
        const data = await response.json();
        console.log('data', data);
        setSavedJobs(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect (() => {
    fetchSavedJobs();
  }, []);

  return (
    <div
      className="search-page min-h-screen"
      style={{
        backgroundImage: `url('../assets/AdobeStock_689555388_deepsea.jpeg')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh',
      }}
    >
      <div
        className="pl-[5%] pt-[5%]"
        style={{
          zIndex: 30,
          fontFamily: 'pacifico',
          color: 'white',
          fontSize: '4rem',
        }}
      >
        WobbeJobs
      </div>
      <div className="flex justify-center ml-[-420px] mt-[-110px]">
        <img
          src={logo}
          alt="tasselled wobbegong shark"
          className="h-[125px] w-[125px]"
        />
      </div>
      <div className="flex justify-center mb-2">
        <img className="h-[80px] ml-[-37.5px]" src={profilePic}></img>
      </div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold mb-4 text-white text-center">
          List of your saved jobs, {useSelector((state) => state.users.username)}
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="max-w-md w-full z-10 bg-white rounded-xl shadow-2xl p-6 bg-blue-200">
          {savedJobs.length ? (
            <ul>
              {savedJobs.map((job, index) => (
                <li key={index}>
                  <p>Title: {job.title}</p>
                  <p>Company: {job.company}</p>
                  <p>Salary: {job.salary}</p>
                  <p>Link to apply: {job.apply}</p>
                  <br></br>
                </li>
              ))}
            </ul>
          ) : null}
          <br />
        </div>
      </div>
    </div>
  );
}

export default SavedJobs;

// allow users to edit firstName, lastName, email, password
// input boxess for each populated with current values
// stretch: upload photo, upload resume
// once save button clicked, message confirming change "your [password/name/etc] has been updated"
// allow users to navigate to search page -> clocking icon on fixed nav bar header
