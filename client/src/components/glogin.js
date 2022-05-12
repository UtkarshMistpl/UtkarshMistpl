import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';
import { Button } from '@material-ui/core';


const clientId = "930455171490-65or5r8589s8fes6gjf1u0es9ogdsbo6.apps.googleusercontent.com";
// secret : 
function Login() {
    const navigate = useNavigate();
    const cmp = "google";
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        let data = res.profileObj;
        setShowloginButton(false);
        setShowlogoutButton(true);
        navigate("/PlayerForm",{state:{data, cmp}});

    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        navigate("/mediadata");
    };

    return (
        <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    render={renderProps=>(
                        <button style={{padding:"0.9rem 2.8rem", fontSize:"1.3rem", color:"#ffffff", background:"#3f51b5"}} onClick={renderProps.onClick} > Sign In With Google</button>

    )}
                    buttonText="Sign In"     
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default Login;