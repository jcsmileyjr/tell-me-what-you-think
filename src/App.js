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
    takeaway: "The main idea is knowing what you can and can’t do; and accepting these limitations in life with a smile instead of a frown. Just because you can't do what you want doesn’ mean it's the end of the world. Attitude and planning determines success just as much as luck.",
  },
  { takeaway:"My thoughts on this article about Perseverance is that success in life and genuine happiness, just don’t happen by luck. It takes hard work by an individual, a vision of what you want to accomplish, and a natural drive to finish what you started. Life is hard. You have to fail until you succeed. You must get back up after being knocked down repeatedly. Perseverance is about faith in God, believing in yourself, and being willing to sweat for a future of your choosing." ,title: "Perseverance of Mrs. Flowers", story: `As a small child, Vonetta (Jeffrey) Flowers dreamed about being in the Olympics.  At age nine, while trying out for an inner-city track club in her hometown of Birmingham, she shocked coaches by posting the best sprint time for Jonesboro Elementary School – running faster than boys two years older than she was.Vonetta’s immense talent carried her to the University of Alabama-Birmingham on a track-and-field scholarship. While at the university, she continued to pursue her goal of gaining a spot on the Olympic team. She practiced meticulously to perfect her stride, spent hours in the weight room adding strength, and ran grueling intervals to shave seconds off her sprint times. Thanks to her combination of talent and discipline, Vonetta ended her college career as a 7-time All-American, competing in the 100 meter and 200 meter sprints, long jump, triple jump, heptathlon, and relays. With her college career finished, Vonetta set her sights on the 1996 Olympics. Unfortunately, she failed to qualify for the team, running slightly behind the leaders. The failure stung, but Vonetta was determined not to give up. She found a job as an assistant coach and continued her regimen of training. For the next four years, Vonetta put her body through punishing workouts with an eye on the 2000 Olympics in Sydney. In her words, “I devoted countless hours to lifting weights, eating right, and staying mentally tough. I knew that my time as an athlete was coming to an end, and I’d hoped that the 2000 Olympic trials would prove to be my year to finally find out what it’s like to be an Olympian". In June 2000, Vonetta lined up again to run at the US Olympic Trials. Unfortunately, Vonetta placed 13th, and she failed to make the Olympic squad. Although one of the fastest women in America, she wasn’t in the select group to represent the United States in Sydney. After 17 years of training, she had come up empty in her quest for the Olympics. Two days after her second painful failure in the Olympic Trials, Vonetta’s husband spotted an advertisement for tryouts for the United States Olympic bobsled team. He convinced her to go to the tryouts. Growing up in the South, Vonetta was not accustomed to cold and snow, and she knew next to nothing about bobsledding. However, at the tryouts her unusual blend of speed and strength proved to be ideal qualities for a brakewoman (the person who pushes the bobsled to give it initial momentum and then hops in with the driver). Vonetta was chosen for the team. Vonetta’s decision to join the bobsled team came with a price – two more years of a strict diet, sore muscles, and countless hours dedicated to attaining peak physical fitness. It also meant delaying her dream to be a mom. However, her years of perseverance paid off. Not only did Vonetta achieve her lifelong goal of competing in the Olympics, but she also became the first African-American to win a gold medal in the winter Olympics. Perseverance punctuates talent. Vonetta’s talent seemed almost limitless, but it wouldn’t have carried her to the Olympics without an admirable measure of perseverance. Life seems designed to make a person quit. For even the most talented individual, obstacles abound, and failures are commonplace. Only when a person matches talent with perseverance do opportunities become avenues of success. Perseverance means succeeding because you are determined to, not destined to. Perseverance means stopping, not because you’re tired, but because the task is done. Perseverance doesn’t come into play until a person is tired. Nonetheless, Vonetta persevered. She kept believing, she kept training, and she kept running until she finally caught up with success.`, read: false, price: 2, paid: false },
  { takeaway: "If one doesn’t understand and experience the difficulty it takes to earn the comfort provided by their loved ones, then they will never value it.  Life is hard. You will become a better version of yourself when you take time to learn and appreciate how hard the people around you work to provide you with the basics of life and a few luxuries.", title: "Appreciation of Hard Work", story: `One young academically excellent person went to apply for a managerial position in a big company. He passed the first interview, the director did the last interview, made the last decision. The director discovered from the CV that the youth’s academic achievements were excellent all the way, from the secondary school until the postgraduate research, never had a year when he did not score. The director asked, “Did you obtain any scholarships in school?” The youth answered “none”. The director asked,  “Was it your father who paid for your school fees?” The youth answered, “My father passed away when I was one year old, it was my mother who paid for my school fees”. The director asked,  “Where did your mother work?” The youth answered, “My mother worked as clothes cleaner." The director requested the youth to show his hands. The youth showed a pair of hands that were smooth and perfect. The director asked, “Have you ever helped your mother wash the clothes before?” The youth answered, “Never, my mother always wanted me to study and read more books! Furthermore, my mother can wash clothes faster than me”. The director said, “I have a request; When you go back today, go and clean your mother’s hands, and then see me tomorrow morning”. The youth felt that his chance of landing the job was high. When he went back, he happily requested his mother to let him clean her hands. His mother felt strange, happy but with mixed feelings, she showed her hands to the kid. The youth cleaned his mother’s hands slowly. His tear fell as he did that. It was the first time he noticed that his mother’s hands were so wrinkled, and there were so many bruises in her hands. Some bruises were so painful that his mother shivered when they were cleaned with water. This was the first time the youth realized that it was this pair of hands that washed the clothes everyday to enable him to pay the school fee. The bruises in the mother’s hands were the price that the mother had to pay for his graduation, academic excellence and his future. After finishing the cleaning of his mother’s hands, the youth quietly washed all the remaining clothes for his mother. That night, mother and son talked for a very long time. Next morning, the youth went to the director’s office. The Director noticed the tears in the youth’s eyes, asked:  “Can you tell me what have you done and learned yesterday in your house?” The youth answered,  “I cleaned my mother’s hand, and also finished cleaning all the remaining clothes”. The Director asked,  “please tell me your feelings”. The youth said, “Number 1, I know now what is appreciation! Without my mother, there would not the successful me today. Number 2, By working together and helping my mother, only I now realize how difficult and tough it is to get something done. Number 3, I have come to appreciate the importance and value of family relationship”. The director said,  “This is what I am looking for to be my manager. I want to recruit a person who can appreciate the help of others, a person who knows the sufferings of others to get things done, and a person who would not put money as his only goal in life. You are hired”. Later on, this young person worked very hard, and received the respect of his subordinates.`, read: false, price: 1.50, paid: false },
  { takeaway: `My takeaway is that everyone, regardless of profession or status in life, deserves your respect and interest. A homeless man could have lived the most interesting life and could teach you things others can’t.  Similar to not judging a book by its cover, always take the time to get to know people. The minimal amount of respect to be shown to any human being, is to say hello  and ask their name.` , title: "Most Important Lesson", story: `During my second month of nursing school, our professor gave us a pop quiz. I was a conscientious student and had breezed through the questions, until I read the last one: "What is the first name of the woman who cleans the school". Surely this was some kind of joke. I had seen the cleaning woman several times. She was tall, dark haired, and in her 50's; but how would I know her name. I handed in my paper, leaving the last question blank. Just before class ended, one student asked if the last question would count towards our quiz grade. "Absolutely," said the professor. "In your careers, you will meet many people. All are significant. They deserve your attention and care, even if all you do is smile and say 'hello'". I've never forgotten that lesson. I also learned her name was Dorothy.` , read: false, price: 2, paid: false },
  { takeaway:`The message I get from this short story is that “One can learn the value of money through hard effort.” My biggest takeaway is to become the best version of yourself, you have to have a respect for money, for other people, and understand how to spend money wisely. Otherwise, you are just throwing money/hard work away.` ,title: "Value Of Money", story: `Once, in a village, there lived a merchant with his wife. After many years of marriage, they were blessed with a son. The spouse grew very happy to get a son. They gratified every wish of their son. The excess of love made him a spoilt boy. Years passed by and the boy grew up to be a very obstinate and spoilt man. His father tried hard to change him, but couldn’t succeed. His son used to spend his money and just wondered about the whole day. One day, the merchant called his son and said, “Son, all these years you’ve been wasting my hard-earned money. After my death, all the property and wealth will be yours. But you should prove that you can also earn money on your own”. His son accepted his challenge. After trying many times, he finally got a job. His job was of loading and unloading sacks full of grains from vehicles to the storehouse. He worked persistently and carried the sack on his back. At the end of the day, he got only twenty-five rupees. But he felt very happy and handed over that money to his father. His father didn’t utter a word and threw away the money in the well behind their house. The son didn’t say anything. But every day he gave money to his father and his father threw it in the well. This continued for a week. One day, the son grew angry and said, “Father, I work hard every day and you throw my hard-earned money in the wall”. The father smiled and replied, “Son, finally I made you understand how I felt all these years when you wasted my hard-earned money”. The son realized his mistake and decided to continue his job. He nevermore wasted any money.`, read: false, price: 2, paid: false },
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
  const [currentTakeaway, setCurrentTakeaway] = useState("");

  useEffect(() => {
    setupApp();
    setCurrentPage("start")
  }, []);

  useEffect(() => {
    calculateMoneyEarnedBeforePay();
  });

  const finishArticle = () => {
    let allStories = stories;
    allStories[storiesRead].read = true;
    setStories(allStories)
    getNextArticle();
    calculateMoneyEarnedBeforePay();
    //console.log("finishedArticle",stories);
  }
  
  const calculateMoneyEarnedBeforePay = () => {
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
    setCurrentTakeaway(stories[nextStoryNumber].takeaway);
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
            const lines = stories[storyNumber].story.split(".");
            setCurrentStory(lines);
            setCurrentTitle(stories[storyNumber].title);
            setCurrentTakeaway(stories[storyNumber].takeaway);
          }
      }else{
          localStorage.setItem('currentStory', JSON.stringify(0));
          const lines = stories[0].story.split(".");
          setCurrentStory(lines);
          setCurrentTakeaway(stories[0].takeaway);
      }
  }  

  const redirectUser = (page) => {
    setCurrentPage(page);
  };

  let storyPrice = stories[storiesRead].price;
  return (
    <div className="container">
      <div className="rain">
        {currentPage === "start" && (
          <Start storyTitle={currentTitle} userStories={currentStory} next={redirectUser} numberOfStoriesRead = {storiesRead} totalEarned = {amountEarned} />
        )}
        {currentPage === "thankyou" && <ThankYou next={redirectUser} done ={finishArticle} moneyMade={storyPrice} takeaway={currentTakeaway} />}
      </div>
    </div>
  );
}

export default App;

