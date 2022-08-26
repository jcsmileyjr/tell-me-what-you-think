import Swal from "sweetalert2";
import React, { useState } from "react";
import "./start.css";

/**
 * Primary page of the app use to display the article to be read and a text area to record the user typed thoughts
 *
 * @param {function} next - Function that moves the user to the "Thank You" page.
 * @param {array} userStories - The original article has been broken into an array of text.
 * @param {number} numberOfStoriesRead - Total number of stories previously read.
 * @param {number} totalEarned - Total of all articles read's dollar amount.
 * @param {string} storyTitle - Title of the current article object
 * @param {function} getUserThoughts - Function use to record the user thoughts from the text area element
 * @param {string} currentUserThoughts - Recorded text from the text area by the user
 * @returns
 */
const Start = ({
  next,
  userStories,
  numberOfStoriesRead,
  totalEarned,
  storyTitle,
  getUserThoughts,
  currentUserThoughts,
}) => {
  const [scaleHeader, setScaleHeader] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [nextParagragh, setNextParagraph] = useState(0);
  const [storyBook, setStoryBook] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  // Take the current article and condense several array text into an paragraph to be displayed
  React.useEffect(() => {
    breakUpStory();
  }, [userStories]);

  /**
   * Function to condense several array text (from the current article stories property) into paragraphs to be displayed.
   * Notes on how to do this function at: https://domhabersack.com/chunking-arrays
   */
  const breakUpStory = () => {
    let article = userStories;
    const numberOfChunks = Math.ceil(article.length / 4);
    let book = [...Array(numberOfChunks)].map((arr, index) => {
      return article.slice(index * 4, (index + 1) * 4);
    });
    setNumberOfPages(book.length);
    setStoryBook(book);
  };

  /**
   * function that displays an UI of a paragraph from the current article or an "End of Article" message
   *
   * @returns a horizontal UI of sentences
   */
  const displayStory = () => {
    let book = ["Waiting"]; // default text if there is an error
    if (storyBook.length !== 0) {
      book = storyBook[nextParagragh];
    }
    const article = book.map((line, index) => {
      if (index !== book.length - 1) {
        return (
          <React.Fragment key={index}>
            {line}.{userStories.length - 1 === index ? "" : <br />}{" "}
            {/* Line break */}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {line}
            {userStories.length - 1 === index ? "" : <br />}
            {nextParagragh === numberOfPages - 1 && (
              <div className="conversation__endOfArticle--container">
                <hr className="style-seven" />
                <p className="conversation__endOfArticle--style">
                  📑End of Article📑
                </p>
                <hr className="style-seven" />
              </div>
            )}
            <div className="conversation__nextPage--container">
              <button
                onClick={() => getNextParagraph()}
                className="conversation__nextPage--style"
              >
                Read More
              </button>
            </div>
          </React.Fragment>
        );
      }
    });
    return article;
  };

  // Function to update the nextParagraph state that faciliate assigning the next paragraph in the storybook state to display.
  const getNextParagraph = () => {
    if (nextParagragh >= storyBook.length - 1) {
      setNextParagraph(0);
    } else {
      setNextParagraph((prevNumber) => prevNumber + 1);
    }
  };

  // function to hide the header section (displayed amount earned & stories read) when user is typing in the text area.
  const hideSection = () => {
    setScaleHeader(true);
    const interval = setInterval(() => {
      setHideHeader(true);
      clearInterval(interval);
    }, 500);
  };

  // function to show the header section (displayed amount earned & stories read) when user is typing in the text area.
  const showSection = () => {
    setScaleHeader(false);
    const interval = setInterval(() => {
      setHideHeader(false);
      clearInterval(interval);
    }, 500);
  };

  return (
    <main>
      <section
        className={`start__section--container ${
          scaleHeader ? "scale-out-center" : "scale-in-center"
        } ${hideHeader ? "hide" : "show"}`}
      >
        <div className="start__display--container">
          <div className="start__header--container">
            <p className="header__title--style">Articles Read</p>
            <p className="header__content--style">{numberOfStoriesRead}</p>
          </div>
          <div className="start__header--container">
            <p className="header__title--style">Money Earned</p>
            <p className="header__content--style">${totalEarned}</p>
          </div>
        </div>
        <p className="header__text--style">
          Get paid for reading and sharing your honest intelligent thoughts.
        </p>
      </section>
      <section className="start__section--container">
        <p className="conversation__header--style">Today's Conversation</p>
        <h1 className="conversation__title--style">{storyTitle}</h1>
        <div className="conversation__content--style">{displayStory()}</div>
      </section>
      <section className="start__section--container">
        <label className="thoughts__header--style">
          What are your thoughts
          <textarea
            onChange={(e) => getUserThoughts(e.target.value)}
            onFocus={() => hideSection()}
            onBlur={() => showSection()}
            className="thoughts__textarea--style"
            id="thoughts"
            rows="12"
          />
        </label>
        <div className="thoughts__button--container">
          <button
            disabled={
              currentUserThoughts === "" || storyTitle === "Warning"
                ? true
                : false
            }
            onClick={() => {
              next("thankyou");
              Swal.fire("Thank you for sharing your thoughts!");
            }}
            className="thoughts__button--style"
          >
            NEXT
          </button>
        </div>
      </section>
    </main>
  );
};

export default Start;
