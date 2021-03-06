import './start.css';
import React, {useState} from 'react';

const Start = ({next, userStories, numberOfStoriesRead, totalEarned, storyTitle})=> {
    const [scaleHeader, setScaleHeader] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [userThoughts, setUserThoughts] = useState("");
    const [nextParagragh, setNextParagraph] = useState(0);
    const [storyBook, setStoryBook] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);

    React.useEffect(() => {
        breakUpStory();
    }, [userStories]);

    // Notes on how to do this function at: https://domhabersack.com/chunking-arrays
    const breakUpStory = () => {
        let article = userStories;
        const numberOfChunks = Math.ceil(article.length / 4)
        let book = [...Array(numberOfChunks)].map((arr, index) => {   
                return article.slice(index * 4, (index + 1) * 4);
        })
        setNumberOfPages(book.length);
        setStoryBook(book);
    }

    const displayStory = () => {
        let book = ["Waiting"];
        if(storyBook.length !== 0){
            book = storyBook[nextParagragh];
        }
        const article = book.map((line, index) => {
            if(index !== book.length - 1){
                return(
                    <React.Fragment key={index}>
                        {line}.
                        {userStories.length - 1 === index?"":<br/>}
                    </React.Fragment>
                )
            }else{
                return(
                    <div key={index}>
                        {line}
                        {userStories.length - 1 === index?"":<br/>}
                        {nextParagragh === numberOfPages -1 &&
                            <div className='conversation__endOfArticle--container'>
                                <hr className="style-seven" />
                                <p className='conversation__endOfArticle--style'>📑End of Article📑</p>
                                <hr className="style-seven" />
                            </div>
                        }
                        <div className='conversation__nextPage--container'>
                            <button onClick={()=> getNextParagraph()} className='conversation__nextPage--style'>Read More</button>
                        </div>
                    </div>
                )
            }
        })
        return article
    }

    const getNextParagraph = () => {
        if(nextParagragh >= (storyBook.length - 1)){
            setNextParagraph(0);
        }else{
            setNextParagraph(prevNumber => prevNumber + 1);
        }
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
                <div className='conversation__content--style'>
                    {displayStory()}         
                </div>

            </section>
            <section className='start__section--container'>
                <label className='thoughts__header--style'>What are your thoughts
                    <textarea onChange={(e)=> setUserThoughts(e.target.value)} onFocus={() => hideSection()} onBlur={() => showSection()} className='thoughts__textarea--style' id="thoughts" rows="12" />
                </label>
                <div className='thoughts__button--container'>
                    <button disabled={userThoughts===""?true:false} onClick={() => next("thankyou") } className='thoughts__button--style'>NEXT</button>
                </div>
            </section>
        </main>
    );
}

export default Start;