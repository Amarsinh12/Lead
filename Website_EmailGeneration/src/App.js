import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';

import Customer from './Components/Customer/Customer';
import Work from './Components/Work/Work';
import Service from './Components/Service/Service';
import Insights from "./Components/Insights/Insights"; 

// import RequestService from './Components/RequestService/RequestService';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Customer />} />
          <Route path="/Customer" element={<Customer />} />

         <Route path='/Login' element={<Login />} />
          <Route path="/Work" element={<Work />} />
          {/* <Route path="/requestService" element={<RequestService />} />  */}
          
          <Route path="/service" element={<Service />} /> {/* Add this route */}
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
