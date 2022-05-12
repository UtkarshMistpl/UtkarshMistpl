import * as react from 'react'
import Chateng from './components/chat';
import ResponsiveAppBar from './AppBar';
import {useLocation} from 'react-router';

export default function UserChat (){
    const location = useLocation();

    const name = location.state.name;
    
    return (
        <div style={{overflow:"hidden"}}>
            {/* <ResponsiveAppBar /> */}
            <Chateng  name={name} />
        </div>
    );
}