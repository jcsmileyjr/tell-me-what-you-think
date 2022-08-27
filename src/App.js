import emailjs from "@emailjs/browser";
import React, { useState, useEffect } from "react";
import "./App.css";
import Start from "./pages/start/Start";
import ThankYou from "./pages/thankYou/ThankYou";

// Object used as default for articles before the Sanity.io database API call and when the reader hit the last story
const outOfStories = {
  title: "Warning",
  story:
    "No more stories, Wait till next week to make more money. Great job!!!",
  read: false,
  price: 0,
  paid: true,
};

/**
 * Handles the business logic of the app
 * @property {string} currentPage - String within the redirectUser() function to move the user between the Start and Thank You pages
 * @property {array} stories - Array of objects with a reading article and related UI data
 * @property {object} currentStorey - Current object from the stories array containing the article and related UI data
 * @property {number} storiesRead - Current total of stories read used to track which article object to be shown to the user
 * @property {number} amountEarned - Total of all articles read dollar amount with the calculateMoneyEarnedBeforePay() function
 * @property {string} currentTitle - Curent title from the article object within the currentStory state
 * @property {string} currentTakeaway - Current takeaway text from the article object withn the currentStory state
 * @property {string} userThoughts - Text type in by the user into the textarea to be sent via email
 */
function App() {
  const [currentPage, setCurrentPage] = useState("");
  const [stories, setStories] = useState([outOfStories]);
  const [currentStory, setCurrentStory] = useState([]);
  const [storiesRead, setStoriesRead] = useState(0);
  const [amountEarned, setAmountEarned] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("Thinking");
  const [currentTakeaway, setCurrentTakeaway] = useState("");
  const [userThoughts, setUserThoughts] = useState("");

  //When the app first loads, gets data via an API call and loads it to the app's state. Move the user to the "Start" page
  useEffect(() => {
    setupApp();
    setCurrentPage("start");
  }, []);

  // Cycle through all stories and if read but not marked as paid, display to the user the total amount earned.
  useEffect(() => {
    calculateMoneyEarnedBeforePay();
  });

  /**
   * Function to email the data typed by the user (userThoughts state) using the EmailJS service & libary
   * @property {object} templateParams - data use by the EmailJS service to content via email
   * @property {string} service_id - email service id provided by EmailJS and setup via the online service. In a .env file & used by Nelify
   * @property {string} template_id - email template id provided by EmailJS and setup via the online service. In a .env file & used by Nelify
   * @property {string} user_id - user id provided by EmailJS and setup via the online service. In a .env file & used by Nelify
   */
  const emailMessage = () => {
    var templateParams = {
      name: "Ameerah Salha",
      message: `${userThoughts}`,
    };
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  /**
   * Function call when the "Finish" button on the Thank You page is pressed. It update the current article object,
   * the amount of money earned, update local storage of the articles array, email the user thoughts, and reset the userthoughts state.
   */
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

  // Cycle through all stories and if read but not marked as paid, display to the user the total amount earned.
  const calculateMoneyEarnedBeforePay = () => {
    let totalAmount = 0;
    stories.forEach((article) => {
      if (
        article.read &&
        (article.paid === false || article.paid === undefined)
      ) {
        totalAmount += article.price;
      }
    });
    setAmountEarned(totalAmount);
  };

  // Called withi the finishedArticle(), this updates the storiesRead, currentStory, currentTitle, and currentTakeaway state
  const getNextArticle = () => {
    const nextStoryNumber = storiesRead + 1;
    setStoriesRead(nextStoryNumber);
    const lines = stories[nextStoryNumber].story.split(".");
    setCurrentStory(lines);
    setCurrentTitle(stories[nextStoryNumber].title);
    setCurrentTakeaway(stories[nextStoryNumber].takeaway);
  };

  // Use a Netlify API call to the Sanity.io database to update the app's data based on if the current data in local storage is fresh
  const setupApp = async () => {
    fetch(".netlify/functions/getStories")
      .then((response) => response.json())
      .then((json) => {
        let data = json.data;
        let previousSavedStories = localStorage.getItem(
          "TellMeWhatYouThink-Content"
        );
        if (
          previousSavedStories !== null &&
          previousSavedStories.length >= data.length
        ) {
          data = JSON.parse(previousSavedStories);
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

  // Current amount offer to be paid if child read the story
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
            currentUserThoughts={userThoughts}
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
