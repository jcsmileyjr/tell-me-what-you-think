import './start.css';
import React, {useState} from 'react';

const Start = ({next})=> {
    const [scaleHeader, setScaleHeader] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [userThoughts, setUserThoughts] = useState("");

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
                        <p className='header__content--style'>4</p>
                    </div>
                    <div className='start__header--container'>
                        <p className='header__title--style'>Money Earned</p>
                        <p className='header__content--style'>$7</p>
                    </div>
                </div>
                <p className='header__text--style'>Get paid for reading and sharing your honest intelligent thoughts.</p>
            </section>
            <section className='start__section--container'>
                <p className='conversation__header--style'>Today's Conversation</p>
                <h1 className='conversation__title--style'>Serenity Prayer</h1>
                <p className='conversation__content--style'>God, give us grace to accept with serenity<br></br>
                the things that cannot be changed,<br></br>
                Courage to change the things
                which should be changed,<br></br>
                and the Wisdom to distinguish
                the one from the other.<br></br>

                Living one day at a time,<br></br>
                Enjoying one moment at a time,<br></br>
                Accepting hardship as a pathway to peace,<br></br>
                Taking, as Jesus did,<br></br>
                This sinful world as it is,<br></br>
                Not as I would have it,<br></br>
                Trusting that You will make all things right,<br></br>
                If I surrender to Your will,<br></br>
                So that I may be reasonably happy in this life,<br></br>
                And supremely happy with You forever in the next.
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