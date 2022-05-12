import ReactDOM from 'react-dom';
import { InstagramLogin } from '@amraneze/react-instagram-login';
import InstaFeeds from './InstaFeeds';
import { useState } from 'react';
import { useNavigate } from 'react-router';



export default function InstaLogin() {
    const navigate = useNavigate();
    const cmp = "instagram";
    const [token, setToken] = useState("");
    const responseInstagram = (response) => {
        console.log(response.name);
        let data = response.name;
        navigate("/PlayerForm",{state:{data, cmp}});
    };

    return <>
        <InstagramLogin
            clientId="715217239638739"
            redirectUri= "https://localhost:3000/"
            buttonText="Login"
            onSuccess={responseInstagram}
            onFailure={responseInstagram}
        />
 
        
    </>
}
