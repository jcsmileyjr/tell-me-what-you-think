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
        </main>
    );
}

export default Start;