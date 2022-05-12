import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import FacebookLogout from 'react-facebook-login';
import {useNavigate} from 'react-router';
import { Button } from '@material-ui/core';


function Fbl() {
  const navigate = useNavigate();
  const cmp = "FB";
  const [logedin, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      console.log(logedin);
      navigate("/PlayerForm",{state:{data, cmp}})

    } else {
      setLogin(false);
    navigate("/mediadata");

    }
  }

  return (
    <div className="container">
      <div style={{ width: '300px' }}>
        <div style={{display:"flex", justifyContent:"center"}}>
          {!logedin &&
            <FacebookLogin
              appId="692301465540540"
              autoLoad={true}
              fields="name, email, picture, first_name, last_name, hometown, locale"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              
             />
          }
          {logedin &&
            <img src={picture}  />
          }
        </div>
        {logedin &&
          <div>

          </div>
        }
      </div>
    </div>
  );
}

export default Fbl;