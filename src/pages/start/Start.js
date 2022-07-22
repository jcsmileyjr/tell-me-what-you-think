import './start.css';
import React, {useState} from 'react';

const Start = ({next, userStories, numberOfStoriesRead, totalEarned, storyTitle})=> {
    const [scaleHeader, setScaleHeader] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [userThoughts, setUserThoughts] = useState("");

    const displayStory = () => {
        const article = userStories.map((line, index) => {
            let determineParagragh = (index) % 6;
            if(determineParagragh !== 0 || index === 0 || index === (userStories.length -1)){
                return(
                    <React.Fragment key={index}>
                        {line}.
                        {userStories.length - 1 === index?"":<br/>}
                    </React.Fragment>
                )
            }else {
                return(
                    <div className='bullet--container' key={index}>
                        <div className='bullet'></div>
                        <div className='bullet'></div>
                        <div className='bullet'></div>
                        <div className='bullet'></div>
                        <div className='bullet'></div>
                    </div>
                );
            }
        })
        return article
    }

    const hideSection = () => {
        setScaleHeader(true);
        const interval = setInterval(() => {setHideHeader(true); clearInterval(interval)},500);
    }

    const showSection = () => {
        setScaleHeader(false);
        const interval = setInterval(() => {setHideHeader(false); clearInterval(interval)},500);
    }
    return(
        <main>
            <section className={`start__section--container ${scaleHeader? 'scale-out-center':"scale-in-center"} ${hideHeader?'hide':'show'}`}>
                <div className='start__display--container'>
                    <div className='start__header--container'>
                        <p className='header__title--style'>Articles Read</p>
                        <p className='header__content--style'>{numberOfStoriesRead}</p>
                    </div>
                    <div className='start__header--container'>
                        <p className='header__title--style'>Money Earned</p>
                        <p className='header__content--style'>${totalEarned}</p>
                    </div>
                </div>
                <p className='header__text--style'>Get paid for reading and sharing your honest intelligent thoughts.</p>
            </section>
            <section className='start__section--container'>
                <p className='conversation__header--style'>Today's Conversation</p>
                <h1 className='conversation__title--style'>{storyTitle}</h1>
                <p className='conversation__content--style'>
                    {displayStory()}         
                </p>

            </section>
            <section className='start__section--container'>
                <p className='thoughts__header--style'>What are your thoughts</p>
                <textarea onChange={(e)=> setUserThoughts(e.target.value)} onFocus={() => hideSection()} onBlur={() => showSection()} className='thoughts__textarea--style' id="thoughts" rows="12" />
                <div className='thoughts__button--container'>
                    <button disabled={userThoughts===""?true:false} onClick={() => next("thankyou") } className='thoughts__button--style'>NEXT</button>
                </div>
            </section>
        </main>
    );
}

export default Start;