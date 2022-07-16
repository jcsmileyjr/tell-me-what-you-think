import "./App.css";
import Start from "./pages/start/Start";
import ThankYou from "./pages/thankYou/ThankYou";
import React, { useState, useEffect } from "react";

const content = [
  {
    story: `God, give us grace to accept with serenity the things that cannot be changed. Courage to change the things which should be changed. And the Wisdom to distinguish the one from the other. Living one day at a time. Enjoying one moment at a time. Accepting hardship as a pathway to peace. Taking, as Jesus did, This sinful world as it is. Not as I would have it. Trusting that You will make all things right, If I surrender to Your will. So that I may be reasonably happy in this life, And supremely happy with You forever in the next.`,
    read: false,
    price: 1,
    paid: false,
  },
  { story: "I am a walking baby", read: false, price: 1, paid: false },
  { story: "I am a walking baby", read: false, price: 1, paid: false },
  { story: "I am a walking baby", read: false, price: 1, paid: false },
  { story: "I am a walking baby", read: false, price: 1, paid: false },
];
function App() {
  const [currentPage, setCurrentPage] = useState("");
  const [stories, setStories] = useState(content);
  const [currentStory, setCurrentStory] = useState("");

  useEffect(() => {
    getCurrentStory();
    setCurrentPage("start")
  }, []);

  const getCurrentStory = ()=> {
      if(localStorage.getItem('currentStory')){
          const storyNumber = JSON.parse(localStorage.getItem('currentStory'));
          const lines = stories[storyNumber].story.split(".");
          setCurrentStory(lines);
      }else{
          localStorage.setItem('currentStory', JSON.stringify(0));
          const lines = stories[0].story.split(".");
          setCurrentStory(lines);
      }
  }  

  const redirectUser = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container">
      <div className="rain">
        {currentPage === "start" && (
          <Start userStories={currentStory} next={redirectUser} />
        )}
        {currentPage === "thankyou" && <ThankYou next={redirectUser} />}
      </div>
    </div>
  );
}

export default App;
