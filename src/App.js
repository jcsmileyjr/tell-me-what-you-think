import './App.css';
import Start from './pages/start/Start';
import ThankYou from './pages/thankYou/ThankYou';
import React, {useState} from 'react';
function App() {

  const [currentPage, setCurrentPage] = useState("start");

  const redirectUser = (page) => {
      setCurrentPage(page)
  }
  return (
    <div className="container">
      <div className='rain'>
        {currentPage ==="start" &&
          <Start next={redirectUser} />
        }
        {currentPage === "thankyou" &&
          <ThankYou />
        }
      </div>
    </div>
  );
}

export default App;
