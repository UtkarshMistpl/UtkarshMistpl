import React, { useState } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import CustomComponent from '@greatsumini/react-facebook-login';
import {useNavigate} from 'react-router';
import { Button } from '@material-ui/core';


function Fblogin() {
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
      
            <FacebookLogin
            appId="692301465540540"
            fields="name, email, picture, first_name, last_name, hometown, locale"
            scope="public_profile,user_friends"
            onSuccess={(response) => {
              console.log('Login Success!', response);
              setLogin(true);
            }}
            onFail={(error) => {
              console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
              console.log('Get Profile Success!', response);
            }}
            render={({ onClick, logout }) => (
              <CustomComponent onClick={onClick} onLogoutClick={logout} />
            )}
          />
          </div>
      </div>
    </div>
  );
}

export default Fblogin;