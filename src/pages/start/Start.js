import './start.css';
import React, {useState} from 'react';

const Start = ()=> {
    return(
        <main>
            <section className='start__section--container'>
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
        </main>
    );
}

export default Start;