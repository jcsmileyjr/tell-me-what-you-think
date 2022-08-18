import "./App.css";
import Start from "./pages/start/Start";
import ThankYou from "./pages/thankYou/ThankYou";
import React, { useState, useEffect } from "react";
//import emailjs from 'emailjs-com';
import emailjs from '@emailjs/browser';

const outOfStories = {
  title: "Warning",
  story:
    "No more stories, Wait till next week to make more money. Great job!!!",
  read: false,
  price: 0,
  paid: true,
};

function App() {
  const [currentPage, setCurrentPage] = useState("");
  const [stories, setStories] = useState([outOfStories]);
  const [currentStory, setCurrentStory] = useState([]);
  const [storiesRead, setStoriesRead] = useState(0);
  const [amountEarned, setAmountEarned] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("Thinking");
  const [currentTakeaway, setCurrentTakeaway] = useState("");
  const [userThoughts, setUserThoughts] = useState("");

  useEffect(() => {
    setupApp();
    setCurrentPage("start");
  }, []);

  useEffect(() => {
    calculateMoneyEarnedBeforePay();
  });

  const emailMessage = () => {
    var templateParams = {
      name:'Ameerah Salha',
      message: `${userThoughts}`
    };
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_USER_ID)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
      console.log('FAILED...', error);
   });
  }

  const finishArticle = () => {
    let allStories = stories;
    allStories[storiesRead].read = true;
    setStories(allStories);
    getNextArticle();
    calculateMoneyEarnedBeforePay();
    setUserThoughts("");
    // TODO: API call to save updated stories to database
    localStorage.setItem(
      "TellMeWhatYouThink-Content",
      JSON.stringify(allStories)
    );
    //emailMessage();
  };

  const calculateMoneyEarnedBeforePay = () => {
    let totalAmount = 0;
    stories.forEach((article) => {
      if (article.read && (article.paid === false || article.paid === undefined)) {
        totalAmount += article.price;
      }
    });
    setAmountEarned(totalAmount);
  };

  const getNextArticle = () => {
    const nextStoryNumber = storiesRead + 1;
    setStoriesRead(nextStoryNumber);
    const lines = stories[nextStoryNumber].story.split(".");
    setCurrentStory(lines);
    setCurrentTitle(stories[nextStoryNumber].title);
    setCurrentTakeaway(stories[nextStoryNumber].takeaway);
  };

  const setupApp = async () => {

    fetch(".netlify/functions/getStories")
      .then((response) => response.json())
      .then((json) => {
        let data = json.data;
        let previousSavedStories = localStorage.getItem("TellMeWhatYouThink-Content");
        if (
          previousSavedStories !== null &&
          previousSavedStories.length >= data.length
        ) {
          data = JSON.parse(previousSavedStories) ;
          console.log("saved data overwritten newly loaded data");
        }
        setStories(data);
        if (localStorage.getItem("currentStory")) {
          const storyNumber = JSON.parse(localStorage.getItem("currentStory"));
          setStoriesRead(storyNumber);
          if (storyNumber === data.length) {
            const lines = outOfStories.story.split(".");
            setCurrentStory(lines);
            setCurrentTitle(outOfStories.title);
          } else {
            const lines = data[storyNumber].story.split(".");
            setCurrentStory(lines);
            setCurrentTitle(data[storyNumber].title);
            setCurrentTakeaway(data[storyNumber].takeaway);
          }

          calculateMoneyEarnedBeforePay();
        } else {
          localStorage.setItem("currentStory", JSON.stringify(0));
          const lines = data[0].story.split(".");
          setCurrentStory(lines);
          setCurrentTakeaway(data[0].takeaway);
        }
      });
  };

  /**
   * Function to move the user between the Start and Thank You page.
   * @param {string} page - name of component the user is being sent to
   */
  const redirectUser = (page) => {
    setCurrentPage(page);
  };

  /**
   * Current amount offer to be paid if child read the story
   */
  let storyPrice = stories[storiesRead].price;
  return (
    <div className="container">
      <div className="rain">
        {currentPage === "start" && (
          <Start
            storyTitle={currentTitle}
            userStories={currentStory}
            next={redirectUser}
            numberOfStoriesRead={storiesRead}
            totalEarned={amountEarned}
            getUserThoughts={setUserThoughts}
            currentUserThoughts = {userThoughts}            
          />
        )}
        {currentPage === "thankyou" && (
          <ThankYou
            next={redirectUser}
            done={finishArticle}
            moneyMade={storyPrice}
            takeaway={currentTakeaway}
          />
        )}
      </div>
    </div>
  );
}

export default App;
