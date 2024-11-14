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
    }
  ];

  const allQuotes = [
    "Believe you can and you&apos;re halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Everything is possible. The impossible just takes longer. - Dan Brown"
  ];

  const allVerses = [
    "Philippians 4:13 - I can do all things through Christ who strengthens me.",
    "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans for welfare and not for evil.",
    "Isaiah 41:10 - Fear not, for I am with you; be not dismayed, for I am your God.",
    "Romans 8:28 - And we know that in all things God works for the good of those who love him.",
    "Joshua 1:9 - Be strong and courageous. Do not be afraid; do not be discouraged."
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
