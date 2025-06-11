import React from 'react';
import './index.css'
import './App.css';
import { AllRoutes } from './AllRoutes/AllRoutes.jsx';
import  { Header,Footer,Search } from './components/index.jsx'

function App() {
  return (
    <div className="bg-white dark:bg-slate-800"> 
      <Header />
       <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
