import {
  Routes,
  Route
} from "react-router-dom";
import PlayerForm from './PlayerForm';
import NewForm from "./components/newForm";
import Employee from "./components/Employee";
import LabTabs from "./MainForm";
import Home from "./Home";
import MapPl from "./components/MapPlayer";
import ClubForm from "./ClubRegistration";
import ResponsiveAppBar from "./AppBar";
import PlayerData from "./PlayerData";
import Profile from "./Profile";
import Login from "./login";
import ForgetPass from "./forgetpass";
import Admin from "./Admin";
import MediaData from "./mediadata";
import InstaFeed from "./instafeed";
import UserChat from "./userChat";

function App() {
  return (
    <div className="App">

      <Routes>

        <Route path='/PlayerForm' element={<PlayerForm/>}/>
        <Route path='components/newForm' element={<NewForm/>}/>
        <Route path='components/Employee' element={<Employee/>}/>
        <Route path='MainForm' element={<LabTabs/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='MapPlayer' element={<MapPl/>}/>
        <Route path='AppBar' element={<ResponsiveAppBar/>}/>
        <Route path='ClubRegistration' element={<ClubForm/>}/>
        <Route path='/PlayerData' element={<PlayerData/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgetpass' element={<ForgetPass/>}/>
        <Route path = '/Admin' element={<Admin />} />
        <Route path = "/mediadata" element={<MediaData />}/>
        <Route path= "/instafeed" element = {<InstaFeed />}/>
        <Route path="/userChat" element={<UserChat />} />

      </Routes>
      
    </div>
  );
}

export default App;