import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const GITHUB_CLIENT_ID = '6dae5c0c009f319f4252';
const GITHUB_CLIENT_SECRET = '9ecbb3de3dcf4b8e5eb2852f310355aa190168b6';
const GITHUB_CALLBACK_URL = 'http://localhost:8080/callback';
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}`;
const GITHUB_AUTH_CODE_SERVER = 'https://github.com/login/oauth/authorize';
const GITHUB_AUTH_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_SERVER = '/user';
const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}`;

const Callback = (props) => {
    useEffect(() => {
        const fetchAccessToken = async () => {
          try {
            const location = new URL(window.location.href);
            const code = location.searchParams.get('code');
            console.log('code: ', code);
    
            const params = new URLSearchParams();
            params.append('client_id', GITHUB_CLIENT_ID);
            params.append('client_secret', GITHUB_CLIENT_SECRET);
            params.append('code', code);
    
            const response = await fetch(GITHUB_AUTH_TOKEN_URL, {
              method: 'POST',
              mode: 'no-cors',
              body: params,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              const accessToken = data.access_token;
              console.log('Access Token:', accessToken);
              // Do something with the access token, like storing it in local storage
              // Then redirect to the desired page
              window.location.href = '/home';
            } else {
              throw new Error('Failed to fetch access token');
            }
          } catch (error) {
            console.error('Error in fetching access token:', error);
          }
        };
    
        fetchAccessToken();
      }, []);




    // const location = useLocation();

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const accessToken = params.get('access_token');
    //     console.log('Received access token: ', accessToken);
       
    // }, [location])



//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAccessToken = async () => {
        
//         const location = new URL(window.location.href);
//         const code = location.searchParams.get('code');
//         console.log('Received Github code', code);
//         if (!code) {
//             console.error('Github OAuth code not found');
//             return;
//         }
        
//         const ACCESS_TOKEN_URL = `${GITHUB_AUTH_TOKEN_SERVER}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`;

//         try {
//         const response = await fetch(ACCESS_TOKEN_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//             mode: 'no-cors',
//         })

//         if (response.status !== 200) {
//             throw new Error('Failed to fetch access token');
//         }

//         const data = await response.json();
//         console.log('Received access token: ', data.access_token);
        
//             // Access token received, you can now navigate to the desired page
//             navigate('/home');
         
//         } catch (error) {
//           console.error('Error in fetching access token:', error);
//         }
//       };
  
//       fetchAccessToken();
//     }, []);
  

  return <div> Logging in ... </div>
};

export default Callback;