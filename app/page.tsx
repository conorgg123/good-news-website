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
  const [currentBackground, setCurrentBackground] = useState('/ocean1.mp4');
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
    "Believe you can and you&apos;re halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Everything is possible. The impossible just takes longer. - Dan Brown",
    "Don&apos;t watch the clock; do what it does. Keep going. - Sam Levenson",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Everything you&apos;ve ever wanted is on the other side of fear. - George Addair",
    "Life is what happens while you&apos;re busy making other plans. - John Lennon",
    "You miss 100% of the shots you don&apos;t take. - Wayne Gretzky",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Whether you think you can or you think you can&apos;t, you&apos;re right. - Henry Ford",
    "The journey of a thousand miles begins with one step. - Lao Tzu",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The harder you work for something, the greater you&apos;ll feel when you achieve it. - Anonymous",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Do what you can, with what you have, where you are. - Theodore Roosevelt"
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
      setCurrentBackground('/ocean1.mp4');
    } else {
      const otherVideos = ['/ocean2.mp4', '/ocean3.mp4'];
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
