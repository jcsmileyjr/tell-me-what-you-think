import './thankYou.css';
import Swal from 'sweetalert2'

/**
 * Final page of the app that displays the takeaway of the current story and amount of money earned for reading.
 * @param {function} next - Function to redirect the user to the "Start" page.
 * @param {function} done - function to update the current article object, update the articles array in local storage, and etc.
 * @param {number} moneyMade - The amount of money earned from reading this article.
 * @param {string} takeaway - Text from the current article object about the story.
 */

const ThankYou = ({next, done, moneyMade, takeaway}) => {
    // function to set the next story and run the finished() fuction when the user press the "Finished" button
    const updateAppData = () => {
        let storyNumber = JSON.parse(localStorage.getItem('currentStory'));
        localStorage.setItem('currentStory', JSON.stringify(storyNumber + 1));
        done();
    }
    return(
        <main className='thankyou__main--container'>
            <h1 className='thankYou__header--style'>You earned ${moneyMade} for sharing your thoughts</h1>
            <h3 className='thankYou__title--style'>My takeaways on the article</h3>
            <p className='thankYou__content--style'>{takeaway}</p>
            <p className='thankYou__instructions--style'>Click the button below to send an email to be paid.</p>
            <div className='thoughts__button--container'>
                <button  onClick={() => {next("start"); updateAppData(); Swal.fire(`Let's earn more money! Read another article.`)}} className='thoughts__button--style'>FINISH</button>
            </div>
        </main>
    );
}

export default ThankYou;