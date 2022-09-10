import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import axios from "axios";
import React, { useState, useEffect, createElement } from "react";
import fakeData from "./develepment-data/test-data.json";
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
    checkForUserName();
    setupApp();
    setCurrentPage("start");
  }, []);

  // Cycle through all stories and if read but not marked as paid, display to the user the total amount earned.
  useEffect(() => {
    calculateMoneyEarnedBeforePay();
  });

  /**
   * Function that checks if a user name is already saved and if not asks for one. Name used to determine
   * if an email or database update should be made
   * @property {string || null} previousSavedName - User name saved to localstorage
   */
  const checkForUserName = () => {
    let previousSavedName = localStorage.getItem("TellMeWhatYouThink-UserName");
    if (previousSavedName === null) {
      getUserName();
    }
  };

  /**
   * Funciton that asks the user for a name and saves it.
   * @property {string} name - Value the user enter's into the pop up modal and save to localstorage
   */
  const getUserName = async () => {
    const { value: name } = await Swal.fire({
      title: "Tell me what YOU think",
      input: "text",
      inputLabel: "What is your name?",
      inputPlaceholder: "Example: Angela",
    });

    if (name === "") {
      getUserName();
    } else {
      localStorage.setItem("TellMeWhatYouThink-UserName", JSON.stringify(name));
    }
  };

  /**
   * Function to email the data typed by the user (userThoughts state) using the EmailJS service & libary. Called within the finishedArticle().
   * @property {object} templateParams - data use by the EmailJS service to content via email
   * @property {string} service_id - email service id provided by EmailJS and setup via the online service. In a .env file & used by Nelify
   * @property {string} template_id - email template id provided by EmailJS and setup via the online service. In a .env file & used by Nelify
   * @property {string} user_id - user id provided by EmailJS and setup via the online service. In a .env file & used by Nelify
   * @property {string} previousSavedName - Saved username
   */
  const emailMessage = () => {
    let previousSavedName = localStorage.getItem("TellMeWhatYouThink-UserName");
    let userName = JSON.parse(previousSavedName);

    if (userName === "Ameerah" || userName === "JC") {
      var templateParams = {
        name: `${userName}`,
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
    }
  };

  /**
   * Function call when the "Finish" button on the Thank You page is pressed. It update the current article object, update the database,
   * the amount of money earned, update local storage of the articles array, email the user thoughts, and reset the userthoughts state.
   */
  const finishArticle = () => {
    let allStories = stories;
    allStories[storiesRead].read = true;
    updateStoryInDatabase(allStories[storiesRead]);
    setStories(allStories);
    getNextArticle();
    calculateMoneyEarnedBeforePay();
    setUserThoughts("");
    localStorage.setItem(
      "TellMeWhatYouThink-Content",
      JSON.stringify(allStories)
    );
    emailMessage();
  };

  /**
   * Function to update the Sanity.io database only if the user is myself or my daughter. Called within the finishedArticle().
   * @param {object} story - Current story with it's "read" property converted to true
   * @property {string} previousSavedName - user name used to determine if the database should be updated
   */
  const updateStoryInDatabase = (story) => {
    console.log("updateStoryInDatabase(), ", story);
    let previousSavedName = localStorage.getItem("TellMeWhatYouThink-UserName");
    let userName = JSON.parse(previousSavedName);

    if (userName === "Ameerah" || userName === "JC") {
      const url = ".netlify/functions/updateStory";
      axios.post(url, JSON.stringify(story)).then(function (response) {
        const data = response.data;
        console.log(data);
      });
    }
  };

  // Cycle through all stories and if read but not marked as paid, display to the user the total amount earned.
  // Called within the finishedArticle(), each useEffect, and when the app data is initially setup.
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

  /**
   * Called within the finishedArticle(), this updates the storiesRead, currentStory, currentTitle, and currentTakeaway state
   * @property {number} nextStoryNumber - Incremented number of stories read
   * @property {string array} lines - A story broken into an array of sentences.
   */
  const getNextArticle = () => {
    const nextStoryNumber = storiesRead + 1;
    setStoriesRead(nextStoryNumber);
    const lines = stories[nextStoryNumber].story.split(".");
    setCurrentStory(lines);
    setCurrentTitle(stories[nextStoryNumber].title);
    setCurrentTakeaway(stories[nextStoryNumber].takeaway);
  };

  /**
   * Use a Netlify API call to the Sanity.io database to update the app's data based on if the current data in local storage is
   * If this a development environment, then test data is used
   * @property {string array} previousSavedStories - Array of stories saved to local storage when the app was las used
   * @property {string array} data - Array of stories downloaded from the database.
   * @property {string} currentWindowLocation - snapshot of current URL to determine if this is developmen or PROD
   */
  const setupApp = async () => {
    const currentWindowLocation = window.location.href;
    if (currentWindowLocation === "http://localhost:3000/") {
      setStories(fakeData);
      createStory(fakeData);
    } else {
      fetch(".netlify/functions/getStories")
        .then((response) => response.json())
        .then((json) => {
          let data = json.data;

          // Check to see if there is saved content and only use the newly fetch data if more stories have been added
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

          setStories(data); // Save the stories to the app's state
          createStory(data); // Determine which story to read and break the story into readable chunks
        });
    }
  };

  /**
   * Determine which story is to be read first and break the story into readable chuncks
   * @param {string array} data - Array of story objects from from a Netilfiy function API call to a database or test data for develepment
   * @property {storyNumber} number - Position in the array of stories that mark the current story to be read
   * @property {string array} lines - A story broken into an array of sentences.
   */
  const createStory = (data) => {
    // Determine what was the last story read if the app was loaded previously. If not, use the first story in the array of stories
    if (localStorage.getItem("currentStory")) {
      const storyNumber = JSON.parse(localStorage.getItem("currentStory"));
      setStoriesRead(storyNumber);

      // Determine if all stories have been read. If not, update app's data with current story
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
