import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const audioRef = useRef(null);
  const visualizerRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: "Veki Veki",
      cover: "/images/veki-veki.png",
      src: "/music/veki.mp3",
    },
    {
      id: 2,
      title: "Lofi Coding Beats",
      cover: "/images/lofi-cover.jpg",
      src: "/music/lofi.mp3",
    },
    {
      id: 3,
      title: "Deep Focus",
      cover: "/images/focus-cover.jpg",
      src: "/music/focus.mp3",
    },
  ];

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => handleNext();

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Visualizer animation
  useEffect(() => {
    if (isPlaying && visualizerRef.current) {
      const bars = visualizerRef.current.children;
      const animation = setInterval(() => {
        Array.from(bars).forEach((bar) => {
          bar.style.height = `${Math.random() * 60 + 20}%`;
        });
      }, 200);

      return () => clearInterval(animation);
    }
  }, [isPlaying]);

  // Play/Pause functionality
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center w-full justify-around rounded-2xl border border-midcolor hover:shadow-2xl transition-all duration-500 p-5 overflow-hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={tracks[currentTrack].src} preload="metadata" />

      {/* Album Cover with Animation */}
      <div className="relative">
        <img
          src={tracks[currentTrack].cover}
          alt={tracks[currentTrack].title}
          className={`w-full h-70 rounded-2xl object-cover transition-all duration-500 ${
            isPlaying ? "scale-101" : "scale-100"
          }`}
        />
      </div>
      <div className="text-2xl font-bold my-5">
        {tracks[currentTrack].title}
      </div>

      {/* Track Info */}
      <div className="">
        {/* Controls */}
        <div className="flex items-center justify-between gap-5 mb-4">
          <button
            onClick={handlePrevious}
            className="p-3 text-solid hover:text-midcolor transition-colors duration-200 hover:scale-110"
          >
            <SkipBack size={24} />
          </button>

          <button
            onClick={handlePlayPause}
            className="bg-solid text-white p-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={handleNext}
            className="p-3 text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:scale-110"
          >
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
