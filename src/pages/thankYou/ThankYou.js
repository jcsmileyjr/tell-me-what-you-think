import './thankYou.css';

const ThankYou = ({next}) => {
    const updateAppData = () => {
        let storyNumber = JSON.parse(localStorage.getItem('currentStory'));
        localStorage.setItem('currentStory', JSON.stringify(storyNumber + 1));
    }
    return(
        <main className='thankyou__main--container'>
            <h1 className='thankYou__header--style'>You earn $1 for sharing your thoughts</h1>
            <h3 className='thankYou__title--style'>My takeaways on the article</h3>
            <ul className='thankYou__content--style'>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
                <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </li>
            </ul>

            <p className='thankYou__instructions--style'>Click the button below to send an email to be paid.</p>
            <div className='thoughts__button--container'>
                <button  onClick={() => {next("start"); updateAppData();}} className='thoughts__button--style'>FINISH</button>
            </div>
        </main>
    );
}

export default ThankYou;