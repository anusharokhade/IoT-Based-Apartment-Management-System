import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import "./App.css";
import Chairman from "./components/Chairman";
import Secretary from "./components/Secretary";
import Owner from "./components/Owner";
import Security from "./components/Security";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";

function App() 
{
  const [loginStatus, setLoginStatus] = useState(false);
  const [login,setLogin]=useState("")
  const [userType, setUserType] = useState("");
  const [oid, setOid] = useState()
  const [firstTime, setFirstTime] = useState(true);
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      {!loginStatus ? 
      (
        <Home
          firstTime={firstTime}
          setFirstTime={setFirstTime}
          setOid={setOid}
          oid={oid}
          setLoginStatus={setLoginStatus}
          setUserType={setUserType}
          setUsername={setUsername}
          setLogin={setLogin} />
      ) : userType === "Admin" ? 
      (
        
        <AdminDashboard setLoginStatus={setLoginStatus} />
      ) : userType === "Chairman" ?
      (
        <BrowserRouter>
        <Chairman setLoginStatus={setLoginStatus}></Chairman>
        </BrowserRouter>
      ) : userType === "Secretary" ? 
      (
        <Secretary setLoginStatus={setLoginStatus}></Secretary>
      ) : userType === "Owner" ? 
      (
        <div>
          <Owner username={username} setLoginStatus={setLoginStatus} oid={oid} login={login}/>
        </div>
      ) : 
      (
        <Security setLoginStatus={setLoginStatus}></Security>
      )}
    </div>
  );
}

export default App;