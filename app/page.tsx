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

  // Content pools
  const allNews = [
    {
      title: "Community Garden Initiative Feeds 1000+ Families",
      source: "Local Impact News",
      sourceUrl: "https://goodnewsnetwork.org/category/environment/",
      description: "Urban farming initiative expands to multiple locations, providing fresh produce and education about sustainable living to over 1000 families each month."
    },
    {
      title: "Revolutionary Solar Technology Breakthrough",
      source: "Renewable Energy Watch",
      sourceUrl: "https://goodnewsnetwork.org/category/science/",
      description: "Scientists achieve record-breaking 45% efficiency in new solar cell design, potentially making solar power more affordable and accessible worldwide."
    },
    {
      title: "Animal Shelter Celebrates 100% Adoption Week",
      source: "Animal Welfare Daily",
      sourceUrl: "https://goodnewsnetwork.org/category/animals/",
      description: "Local shelter finds loving homes for all animals during adoption event, setting new community record for pet adoptions in a single week."
    },
    {
      title: "Free Coding Program Reaches Rural Students",
      source: "Education Forward",
      sourceUrl: "https://goodnewsnetwork.org/category/youth/",
      description: "Initiative brings computer science education to underserved areas, helping bridge the digital divide and create new opportunities for rural youth."
    },
    {
      title: "Massive Ocean Cleanup Success Story",
      source: "Marine Conservation News",
      sourceUrl: "https://goodnewsnetwork.org/category/earth/",
      description: "Ocean cleanup project exceeds goals, removing 200 tons of plastic from Pacific Ocean using innovative new technology."
    },
    {
      title: "City Plants 100,000 Trees in Climate Initiative",
      source: "Green Future Today",
      sourceUrl: "https://goodnewsnetwork.org/category/earth/",
      description: "Ambitious urban forestry project completes massive tree-planting campaign, creating new green spaces and improving air quality."
    },
    {
      title: "Breakthrough in Alzheimer's Research",
      source: "Medical Breakthroughs",
      sourceUrl: "https://goodnewsnetwork.org/category/health/",
      description: "New treatment shows promising results in early trials, potentially offering hope to millions affected by Alzheimer's disease."
    },
    {
      title: "Students Create Award-Winning Pollution Solution",
      source: "Tech for Good",
      sourceUrl: "https://goodnewsnetwork.org/category/youth/",
      description: "High school team develops innovative air purification system, winning international science competition and attracting environmental interest."
    }
  ];

  const allQuotes = [
    "Believe you can and You&apos;re halfway there there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Everything is possible. The impossible just takes longer. - Dan Brown",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Everything you've ever wanted is on the other side of fear. - George Addair",
    "Life is what happens while you're busy making other plans. - John Lennon",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Whether you think you can or you think you can't, you're right. - Henry Ford",
    "The journey of a thousand miles begins with one step. - Lao Tzu",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis"
  ];

  const allVerses = [
    "Philippians 4:13 - I can do all things through Christ who strengthens me.",
    "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans for welfare and not for evil.",
    "Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God.",
    "Romans 8:28 - And we know that in all things God works for the good of those who love him.",
    "Joshua 1:9 - Be strong and courageous. Do not be afraid; do not be discouraged.",
    "Proverbs 3:5-6 - Trust in the Lord with all your heart and lean not on your own understanding.",
    "Psalm 23:4 - Even though I walk through the valley of the shadow of death, I will fear no evil.",
    "Matthew 11:28 - Come to me, all you who are weary and burdened, and I will give you rest.",
    "John 3:16 - For God so loved the world that he gave his one and only Son.",
    "Psalm 46:1 - God is our refuge and strength, an ever-present help in trouble."
  ];

  const getRandomContent = () => {
    setIsLoading(true);
    
    // Add a small delay to show loading state
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

  useEffect(() => {
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

    // Get initial content
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
      {/* Background Video */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full"
          style={{ opacity: 0.8 }}
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
                onClick={getRandomContent}
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
            <h2 className="text-2xl font-bold mb-4 text-white">Today's Good News</h2>
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
