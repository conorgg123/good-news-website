'use client';

import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  source: string;
  sourceUrl: string;
  description: string;
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('/ocean2.mp4');
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [quotes, setQuotes] = useState<string[]>([]);
  const [verses, setVerses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const allNews = [
    {
      title: "Community Plants 10,000 Trees in Urban Areas",
      source: "Environmental News",
      sourceUrl: "https://goodnewsnetwork.org/category/environment/",
      description: "Local volunteers transform city landscapes with massive tree-planting initiative, creating new green spaces for future generations."
    },
    {
      title: "Solar Power Breakthrough Could Revolutionize Energy",
      source: "Tech Today",
      sourceUrl: "https://goodnewsnetwork.org/category/science/",
      description: "New solar panel design achieves record-breaking efficiency levels, promising more affordable clean energy for communities worldwide."
    },
    {
      title: "Shelter Pets Find Homes in Record Numbers",
      source: "Animal News",
      sourceUrl: "https://goodnewsnetwork.org/category/animals/",
      description: "Weekend adoption event results in empty kennels at local shelter as community comes together to give pets forever homes."
    },
    {
      title: "Students Create App to Help Elderly Connect",
      source: "Youth Impact",
      sourceUrl: "https://goodnewsnetwork.org/category/youth/",
      description: "High school coding club develops free app connecting senior citizens with volunteers for daily tasks and companionship."
    },
    {
      title: "Ocean Cleanup Project Exceeds Expectations",
      source: "Marine News",
      sourceUrl: "https://goodnewsnetwork.org/category/environment/",
      description: "Innovative system removes 100,000 kg of plastic from ocean, showing promising results for marine ecosystem recovery."
    },
    {
      title: "Community Garden Feeds Over 1,000 Families",
      source: "Local Heroes",
      sourceUrl: "https://goodnewsnetwork.org/category/heroes/",
      description: "Volunteer-run garden project provides fresh produce to community members, fostering sustainable food solutions."
    },
    {
      title: "New Cancer Treatment Shows 90% Success Rate",
      source: "Health News",
      sourceUrl: "https://goodnewsnetwork.org/category/health/",
      description: "Revolutionary therapy offers hope in early clinical trials, showing unprecedented results in treating specific cancer types."
    },
    {
      title: "Small Town Achieves 100% Renewable Energy",
      source: "Green Future",
      sourceUrl: "https://goodnewsnetwork.org/category/environment/",
      description: "Community becomes first in region to run entirely on clean energy, setting example for sustainable living."
    },
    {
      title: "Youth Coding Program Receives Major Funding",
      source: "Education Weekly",
      sourceUrl: "https://goodnewsnetwork.org/category/youth/",
      description: "Free programming classes to be offered in underserved areas, opening new opportunities for young learners."
    },
    {
      title: "Historic Wildlife Recovery in Protected Areas",
      source: "Nature Watch",
      sourceUrl: "https://goodnewsnetwork.org/category/environment/",
      description: "Endangered species populations show remarkable comeback thanks to conservation efforts and community support."
    },
    {
      title: "Revolutionary Water Purification Method Developed",
      source: "Science Daily",
      sourceUrl: "https://goodnewsnetwork.org/category/science/",
      description: "Low-cost solution could provide clean water to millions, making safe drinking water more accessible globally."
    },
    {
      title: "Food Bank Expansion Reaches Rural Communities",
      source: "Community Care",
      sourceUrl: "https://goodnewsnetwork.org/category/world/",
      description: "Mobile food pantry program launches to serve remote areas, ensuring no community goes hungry."
    }
  ];

  const allQuotes = [
    "Believe you can, and you're already halfway there. The power of belief is transformative. - Theodore Roosevelt",
    "The future belongs to those who dare to dream boldly and work tirelessly to bring those dreams to life. - Eleanor Roosevelt",
    "Success is a fleeting moment, and failure is a teacher. Courage is the fuel to keep moving forward. - Winston Churchill",
    "The only way to create lasting impact is to be passionate about the work you do. - Steve Jobs",
    "What we call impossible is often a limitation of our imagination. Dream beyond boundaries. - Dan Brown",
    "Don’t measure time, use it meaningfully. Every moment spent in action brings you closer to your goals. - Sam Levenson",
    "The future is not something you predict but something you create with your decisions today. - Peter Drucker",
    "The life you desire is often hidden behind the fears you dare not face. - George Addair",
    "Life unfolds while we are busy making plans. Appreciate the moments, for they are the true story. - John Lennon",
    "Opportunities are missed with inaction; only bold moves bring about change. - Wayne Gretzky",
    "Amidst adversity lies the chance to uncover your greatest potential. - Albert Einstein",
    "Starting is the most powerful step toward transformation. Take that leap of faith. - Mark Twain",
    "If you believe you can, you open a world of possibilities. Self-doubt closes doors before they open. - Henry Ford",
    "A journey of a thousand miles begins with a single step, a decision to embrace the unknown. - Lao Tzu",
    "Dreams know no age limit; new aspirations bring life to your soul, no matter your years. - C.S. Lewis",
    "Hard work is the silent architect of dreams turned into reality. - Anonymous",
    "Success means falling and standing back up, each time more determined than before. - Winston Churchill",
    "The greatest battles are fought within. Nurture what lies within you. - Ralph Waldo Emerson",
    "Doubts are chains that bind us to mediocrity. Break free and realize tomorrow's potential. - Franklin D. Roosevelt",
    "Work with all you have, wherever you are, and create miracles from what appears ordinary. - Theodore Roosevelt",
    "The impossible is often just the unattempted. Dream, then act. - Charles Kingsleigh",
    "Those who dare to dream big risk failure but gain growth in return. - Norman Vaughan",
    "Our minds shape our world. Think beyond limitations. - Buddha",
    "Action is where dreams become reality. Without it, ideas are mere whispers in the wind. - Pablo Picasso",
    "Turn toward the light, and your fears will fade behind you like mere shadows. - Walt Whitman",
    "The change you wish for must first manifest within you. - Mahatma Gandhi",
    "Destiny is a canvas painted by your choices and intentions. - Ralph Waldo Emerson",
    "Time is a resource that waits for no one. Seize it, or it slips through your fingers. - Napoleon Hill",
    "Pursue the life you’ve always imagined, with unshakable belief in your direction. - Henry David Thoreau",
    "Circumstances shape us, but our decisions define us. - Stephen Covey",
    "Fear is a barrier. On the other side lies everything you’ve been searching for. - George Addair",
    "Challenges forge us into beings capable of great things. Embrace them. - C.S. Lewis",
    "You hold more strength and potential than any obstacle that stands before you. - Christian D. Larson",
    "Impossibility is a temporary state, overcome by will and effort. - Nelson Mandela",
    "Create your future, for it is a blank slate awaiting your masterpiece. - Chris Grosser",
    "Failure is not an end but a beginning, a chance to learn and innovate. - Thomas A. Edison",
    "Never stop dreaming, for each dream brings you one step closer to your purpose. - Nelson Mandela",
    "Your mind’s narrative shapes your reality. Rewrite your story, redefine your limits. - Jordan Belfort",
    "True success is making a difference that outlives you. - Roy T. Bennett",
    "Those who chase excellence often find themselves at success's doorstep. - Henry David Thoreau",
    "Sacrifice the comfort of the present for the greatness of tomorrow. - John D. Rockefeller",
    "Work fuels fortune. Luck favors those who are prepared to seize opportunity. - Thomas Jefferson",
    "Determination is a shield against the storms of failure. - Og Mandino",
    "Dream fearlessly and fail ambitiously; it is how we learn to fly. - James Cameron",
    "Glory is in getting up every time you stumble. - Confucius",
    "What seems like limits are illusions of the mind. Push past them. - Anonymous",
    "Success is a journey taken by those who step into the unknown. - Anonymous",
    "To grow, one must first leave the familiar behind. - Anonymous",
    "Visualize the dream, commit to it, and act relentlessly. - Anonymous",
    "The universe rewards those who act. - Anonymous",
    "Perseverance turns struggle into triumph. - Anonymous",
    "Awaken with purpose and let satisfaction be your companion at night. - Anonymous",
    "Your future is built on the foundations you lay today. - Anonymous",
    "Life’s biggest leaps often begin with small steps. - Anonymous",
    "Nothing worthwhile is easy, but effort turns impossible into reality. - Anonymous",
    "Seize the day; don't wait for things to happen. Make them happen. - Anonymous",
    "Sometimes, strength lies in discovering what you are truly made of. - Anonymous",
    "Clear goals create unstoppable momentum. - Anonymous",
    "Dreams remain dreams until they are built one act at a time. - Anonymous",
    "Push forward until your dreams are no longer dreams but your reality. - Oprah Winfrey",
    "Half the battle is believing in yourself. - Theodore Roosevelt",
    "Craft your ideal world in your mind, and work to bring it into existence. - Brian Tracy",
    "Those who prepare today have an advantage tomorrow. - Brian Tracy",
    "Countless people have overcome adversity; so can you. - Jack Canfield",
    "Those who adapt and improve often emerge victorious. - John Wooden",
    "Courage is leaving behind the familiar to grow. - Jim Rohn",
    "Progress waits for no one. Take risks, explore, and evolve. - Michael John Bobak",
    "We may face setbacks, but resilience leads us to greatness. - Maya Angelou",
    "Knowing without doing is stagnation; action is power. - Johann Wolfgang Von Goethe",
    "Sitting breeds fear; movement breeds strength. - Dr. Henry Link",
    "Confidence breeds action, and action breeds results. - Henry Ford",
    "Life is either a daring adventure or mere existence. Choose to live fully. - Helen Keller",
    "Trust in yourself, and the world will trust you. - Hasidic Proverb",
    "Doubts can hold back an entire generation's future. Break through them. - Franklin D. Roosevelt",
    "Intelligence shines when it dances with creativity. - Albert Einstein",
    "Your hustle bridges the gap between ordinary and extraordinary. - Don Zimmer",
    "Make the most of every tool and every opportunity you have. - Theodore Roosevelt",
    "Gratitude turns what we have into enough and more. - Brian Tracy",
    "Aspire to become a new version of yourself, one goal at a time. - Les Brown",
    "Courage is standing up for what is right, even when no one else does. - Confucius",
    "Exercise the mind with wisdom, and the soul with purpose. - Brian Tracy",
    "Embody confidence, and soon it becomes your essence. - Brian Tracy",
    "Prepare for the future by building your strength today. - Malcolm X",
    "Transformations happen through actions that reflect our highest selves. - Anonymous",
    "Little by little, progress adds up to achievement. - Anonymous",
    "Each act of courage is one step closer to your dream. - Coleman Young",
    "Remember the passion that sparked your journey. - Anonymous",
    "Let go of what holds you back and soar toward your destiny. - Buddha",
    "Waiting for fate to smile on you often leads to wasted dreams. Work for it. - Anonymous",
    "Growth starts when you embrace discomfort. - Anonymous",
    "Think big, dream bigger, and never settle. - Anonymous",
    "Make every day count and leave a lasting legacy. - Muhammad Ali",
    "If doors don't open, build your own path. - Milton Berle",
    "Your thoughts shape your reality; guard them wisely. - Anonymous",
    "Work with purpose, and your success will feel even sweeter. - Anonymous",
    "A vision fueled by action can build wonders. - Anonymous"
];


  const allVerses = [
    "Philippians 4:13 - I can do all things through Christ who strengthens me.",
    "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    "Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.",
    "Romans 8:28 - And we know that in all things God works for the good of those who love him.",
    "Joshua 1:9 - Be strong and courageous. Do not be afraid; do not be discouraged.",
    "Proverbs 3:5-6 - Trust in the Lord with all your heart and lean not on your own understanding.",
    "Psalm 23:4 - Even though I walk through the valley of the shadow of death, I will fear no evil.",
    "Matthew 11:28 - Come to me, all you who are weary and burdened, and I will give you rest.",
    "John 3:16 - For God so loved the world that he gave his one and only Son.",
    "Psalm 46:1 - God is our refuge and strength, an ever-present help in trouble.",
    "Romans 15:13 - May the God of hope fill you with all joy and peace.",
    "2 Timothy 1:7 - For God has not given us a spirit of fear, but of power and of love.",
    "Hebrews 11:1 - Now faith is confidence in what we hope for and assurance about what we do not see.",
    "1 Peter 5:7 - Cast all your anxiety on him because he cares for you.",
    "Colossians 3:23 - Whatever you do, work at it with all your heart, as working for the Lord."
  ];

  useEffect(() => {
    const getRandomContent = () => {
      setIsLoading(true);
      setTimeout(() => {
        const randomNews = [...allNews].sort(() => Math.random() - 0.5).slice(0, 5);
        const randomQuotes = [...allQuotes].sort(() => Math.random() - 0.5).slice(0, 3);
        const randomVerses = [...allVerses].sort(() => Math.random() - 0.5).slice(0, 2);

        setHeadlines(randomNews);
        setQuotes(randomQuotes);
        setVerses(randomVerses);
        setIsLoading(false);
      }, 500);
    };

    // Set up audio
    const audio = new Audio('/relaxing_music.mp3');
    audio.loop = true;
    setAudioElement(audio);

    // Set random background (90% chance for ocean1.mp4)
    const randomVal = Math.random();
    if (randomVal < 0.9) {
      setCurrentBackground('/ocean2.mp4');
    } else {
      const otherVideos = ['/ocean1.mp4', '/ocean3.mp4'];
      setCurrentBackground(otherVideos[Math.floor(Math.random() * 2)]);
    }

    getRandomContent();

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full"
          style={{ opacity: 0.9 }}
        >
          <source src={currentBackground} type="video/mp4" />
        </video>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <h1 className="text-4xl font-bold text-gray-800">
              Good Morning News & Quotes
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const getRandomContent = () => {
                    setIsLoading(true);
                    setTimeout(() => {
                      const randomNews = [...allNews].sort(() => Math.random() - 0.5).slice(0, 5);
                      const randomQuotes = [...allQuotes].sort(() => Math.random() - 0.5).slice(0, 3);
                      const randomVerses = [...allVerses].sort(() => Math.random() - 0.5).slice(0, 2);

                      setHeadlines(randomNews);
                      setQuotes(randomQuotes);
                      setVerses(randomVerses);
                      setIsLoading(false);
                    }, 500);
                  };
                  getRandomContent();
                }}
                className="p-2 rounded-full hover:bg-white/25 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? '⌛' : '🔄'}
              </button>
              <button
                onClick={toggleMusic}
                className="p-2 rounded-full hover:bg-white/25 transition-colors"
              >
                {isPlaying ? "🔊" : "🔇"}
              </button>
            </div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Today&apos;s Good News</h2>
            <div className="space-y-6">
              {headlines.map((item, index) => (
                <div key={index} className="border-b border-gray-600/50 pb-6 last:border-0">
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-100 my-2">{item.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-200 text-sm">From:</span>
                    <a 
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 text-sm hover:text-blue-200 underline"
                    >
                      {item.source}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900/60 backdrop-blur-sm rounded-lg p-6 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Daily Quotes</h2>
            {quotes.map((quote, index) => (
              <p key={index} className="text-gray-100 italic mb-4 last:mb-0">
                {quote}
              </p>
            ))}
          </div>

          <div className="bg-indigo-900/60 backdrop-blur-sm rounded-lg p-6 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Daily Bible Verses</h2>
            {verses.map((verse, index) => (
              <p key={index} className="text-gray-100 italic mb-4 last:mb-0">
                {verse}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
