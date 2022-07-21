import "./App.css";
import Start from "./pages/start/Start";
import ThankYou from "./pages/thankYou/ThankYou";
import React, { useState, useEffect } from "react";

const content = [
  { title: "Serenity Prayer",
    story: `God, give us grace to accept with serenity the things that cannot be changed. Courage to change the things which should be changed. And the Wisdom to distinguish the one from the other. Living one day at a time. Enjoying one moment at a time. Accepting hardship as a pathway to peace. Taking, as Jesus did, This sinful world as it is. Not as I would have it. Trusting that You will make all things right, If I surrender to Your will. So that I may be reasonably happy in this life, And supremely happy with You forever in the next.`,
    read: false,
    price: 1,
    paid: false,
  },
  { title: "Perseverance of Mrs. Flowers", story: `As a small child, Vonetta (Jeffrey) Flowers dreamed about being in the Olympics.  At age nine, while trying out for an inner-city track club in her hometown of Birmingham, she shocked coaches by posting the best sprint time for Jonesboro Elementary School – running faster than boys two years older than she was.Vonetta’s immense talent carried her to the University of Alabama-Birmingham on a track-and-field scholarship. While at the university, she continued to pursue her goal of gaining a spot on the Olympic team. She practiced meticulously to perfect her stride, spent hours in the weight room adding strength, and ran grueling intervals to shave seconds off her sprint times. Thanks to her combination of talent and discipline, Vonetta ended her college career as a 7-time All-American, competing in the 100 meter and 200 meter sprints, long jump, triple jump, heptathlon, and relays. With her college career finished, Vonetta set her sights on the 1996 Olympics. Unfortunately, she failed to qualify for the team, running slightly behind the leaders. The failure stung, but Vonetta was determined not to give up. She found a job as an assistant coach and continued her regimen of training. For the next four years, Vonetta put her body through punishing workouts with an eye on the 2000 Olympics in Sydney. In her words, “I devoted countless hours to lifting weights, eating right, and staying mentally tough. I knew that my time as an athlete was coming to an end, and I’d hoped that the 2000 Olympic trials would prove to be my year to finally find out what it’s like to be an Olympian". In June 2000, Vonetta lined up again to run at the US Olympic Trials. Unfortunately, Vonetta placed 13th, and she failed to make the Olympic squad. Although one of the fastest women in America, she wasn’t in the select group to represent the United States in Sydney. After 17 years of training, she had come up empty in her quest for the Olympics. Two days after her second painful failure in the Olympic Trials, Vonetta’s husband spotted an advertisement for tryouts for the United States Olympic bobsled team. He convinced her to go to the tryouts. Growing up in the South, Vonetta was not accustomed to cold and snow, and she knew next to nothing about bobsledding. However, at the tryouts her unusual blend of speed and strength proved to be ideal qualities for a brakewoman (the person who pushes the bobsled to give it initial momentum and then hops in with the driver). Vonetta was chosen for the team. Vonetta’s decision to join the bobsled team came with a price – two more years of a strict diet, sore muscles, and countless hours dedicated to attaining peak physical fitness. It also meant delaying her dream to be a mom. However, her years of perseverance paid off. Not only did Vonetta achieve her lifelong goal of competing in the Olympics, but she also became the first African-American to win a gold medal in the winter Olympics. Perseverance punctuates talent. Vonetta’s talent seemed almost limitless, but it wouldn’t have carried her to the Olympics without an admirable measure of perseverance. Life seems designed to make a person quit. For even the most talented individual, obstacles abound, and failures are commonplace. Only when a person matches talent with perseverance do opportunities become avenues of success. Perseverance means succeeding because you are determined to, not destined to. Perseverance means stopping, not because you’re tired, but because the task is done. Perseverance doesn’t come into play until a person is tired. Nonetheless, Vonetta persevered. She kept believing, she kept training, and she kept running until she finally caught up with success.`, read: false, price: 1, paid: false },
  { title: "Serenity Prayer", story: "I am a walking baby", read: false, price: 1.50, paid: false },
  { title: "Serenity Prayer", story: "I am a walking baby", read: false, price: 2, paid: false },
  { title: "Serenity Prayer", story: "I am a walking baby", read: false, price: 2, paid: false },
];

const outOfStories = {
  title: "Warning",
  story:"No more stories, Wait till next week to make more money. Great job!!!",
  read: false,
  price:0,
  paid: true
}
function App() {
  const [currentPage, setCurrentPage] = useState("");
  const [stories, setStories] = useState(content);
  const [currentStory, setCurrentStory] = useState([]);
  const [storiesRead, setStoriesRead] = useState(0);
  const [amountEarned, setAmountEarned] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    setupApp();
    setCurrentPage("start")
  }, []);

  useEffect(() => {
    calculateMoneyEarned();
  });

  const finishArticle = () => {
    let allStories = stories;
    allStories[storiesRead].read = true;
    setStories(allStories)
    getNextArticle();
    calculateMoneyEarned();
    //console.log("finishedArticle",stories);
  }
  
  const calculateMoneyEarned = () => {
    //console.log("calculate, show stories", stories)
    let totalAmount = 0;
    stories.forEach(article => {
      if(article.read && article.paid === false){
        totalAmount += article.price;
      }
    });
    setAmountEarned(totalAmount);
  }
  
  const getNextArticle = () => {
    const nextStoryNumber = storiesRead + 1;
    setStoriesRead(nextStoryNumber);
    const lines = stories[nextStoryNumber].story.split(".");
    setCurrentStory(lines);
    setCurrentTitle(stories[nextStoryNumber].title);
  }

  const setupApp = ()=> {
      if(localStorage.getItem('currentStory')){
          const storyNumber = JSON.parse(localStorage.getItem('currentStory'));
          setStoriesRead(storyNumber);
          if(storyNumber === stories.length){
            const lines = outOfStories.story.split(".");
            setCurrentStory(lines);
            setCurrentTitle(outOfStories.title);
          }else{
            console.log("display current story number", storyNumber)
            const lines = stories[storyNumber].story.split(".");
            setCurrentStory(lines);
            setCurrentTitle(stories[storyNumber].title);
          }
      }else{
          localStorage.setItem('currentStory', JSON.stringify(0));
          const lines = stories[0].story.split(".");
          setCurrentStory(lines);
      }
  }  

  const redirectUser = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container">
      <div className="rain">
        {currentPage === "start" && (
          <Start storyTitle={currentTitle} userStories={currentStory} next={redirectUser} numberOfStoriesRead = {storiesRead} totalEarned = {amountEarned} />
        )}
        {currentPage === "thankyou" && <ThankYou next={redirectUser} done ={finishArticle} />}
      </div>
    </div>
  );
}

export default App;

