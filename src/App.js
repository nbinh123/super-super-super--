import logo from './logo.svg';
import './App.css';
import GlobalContext from './hooks/globalContexts/GlobalContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';

// components
import Header from './layouts/header/Header';
import Body from './layouts/body/Body';
import Footer from './layouts/footer/Footer';
import getAPI from './server/axios/getAPI';

function App() {

  const IP = "192.168.1.8"
  const [userData, setUserData] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(token){
            getAPI(`http://${IP}:5000/api/user/get`, {
              id: token
            }, null, (response) => {
              setUserData(response)
            })
        } 
    },[])

  return (
    <Router>
      <GlobalContext.Provider
        value={{
          IP,
          userData, 
          setUserData
        }}
      >
        <div className="App">
          <Header />
          <Body />
          {/* <Footer /> */}
        </div>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
