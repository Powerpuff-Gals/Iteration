import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



const Callback = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  
  
    const fetchData = async () => {
      
      const location = new URL(window.location.href);
      const code = location.searchParams.get('code');
      console.log('code', code);

      try {
        // make GET request to /callbackgithub?code={code}
        const response = await axios.get(`/callbackGithub?code=${code}`);
        // console.log('response', response);
        if (response.status === 200) {
          // If the response is successful, extract the email from the response data
          console.log('response from BE: ', response);
          
          const { user, email } = response.data;

          console.log('user: ', user);
          console.log('email: ', email);
        
          setUser(user);

          setEmail(email);
          // Set the current email using setCurrentEmail
          props.setCurrentEmail(email);
          // Redirect to the home page
          navigate('/home');
        } else {
          // Handle error cases
          console.log('Error: Unable to fetch BE github data');
        }
        setDataFetched(true);
      } catch (error) {
        console.log('Error in fetching BE github data:', error);
      }
    };
    useEffect(() => {
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched])

  // const { code } = req.query;

  // const finalUrl = 'https://github.com/login/oauth/access_token';
  // const body = {
  //   client_id: '6dae5c0c009f319f4252',
  //   client_secret: '9ecbb3de3dcf4b8e5eb2852f310355aa190168b6',
  //   code,
  // };

  // try {
  //   const { data: requestToken} = await axios.post(finalUrl, body, {
  //     headers: { Accept: 'application/json' },
  //     });

  //     console.log('requestToken: ', requestToken)
  //     const { access_token } = requestToken;

  //     const apiUrl = 'https://api.github.com';
  //     const { data: userdata } = await axios.get(`${apiUrl}/user`, {
  //       headers: { Authorization: `token ${access_token}`},
  //     });
  //     console.log('user: ', userdata);

  //     const { data: emailDataArr } = await axios.get(`${apiUrl}/user/emails`,{
  //       headers: { Authorization: `token ${access_token}`},
  //     });

  //     console.log('user email: ', emailDataArr);
  //     res.locals.user = userdata;
  //     res.locals.email = emailDataArr;

  //     res.status(201).json({
  //       user: userdata.login,
  //       email: emailDataArr[0].email,
  //     })
  //     // return res.status(201).redirect('/home');
  //   } catch (error) {
  //     console.error('Error in fetching access token', error);
  //     return res.redirect(500, 'Error in fetching access token')
  //   }
  // }
    // useEffect(() => {
    //     const fetchAccessToken = async () => {
    //       try {
    //         const location = new URL(window.location.href);
    //         const code = location.searchParams.get('code');
    //         console.log('code: ', code);
    
    //         const params = new URLSearchParams();
    //         params.append('client_id', GITHUB_CLIENT_ID);
    //         params.append('client_secret', GITHUB_CLIENT_SECRET);
    //         params.append('code', code);
    
    //         const response = await fetch(GITHUB_AUTH_TOKEN_URL, {
    //           method: 'POST',
    //           mode: 'no-cors',
    //           body: params,
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //           },
    //         });
    
    //         if (response.ok) {
    //           const data = await response.json();
    //           const accessToken = data.access_token;
    //           console.log('Access Token:', accessToken);
    //           // Do something with the access token, like storing it in local storage
    //           // Then redirect to the desired page
    //           window.location.href = '/home';
    //         } else {
    //           throw new Error('Failed to fetch access token');
    //         }
    //       } catch (error) {
    //         console.error('Error in fetching access token:', error);
    //       }
    //     };
    
    //     fetchAccessToken();
    //   }, []);




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
  

  return <div> Loading... </div>
};

export default Callback;