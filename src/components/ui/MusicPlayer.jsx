import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: "Veki Veki",
      cover: "/images/veki-veki.png",
      src: "/music/veki.mp3",
    },
    {
      id: 2,
      title: "Attention",
      cover: "/images/attention.jpg",
      src: "/music/attention.mp3",
    },
    {
      id: 3,
      title: "All The Star",
      cover: "/images/allthestar.jpg",
      src: "/music/allthestar.mp3",
    },
  ];

  // Stop playback when a song ends (no auto-next)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Playback error:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    setIsPlaying(false); // stop auto-playing next
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setIsPlaying(false); // stop auto-playing previous
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-around rounded-2xl border border-midcolor hover:shadow-2xl transition-all duration-500 p-6 overflow-hidden">
      <audio ref={audioRef} src={tracks[currentTrack].src} preload="metadata" />

      {/* Album cover */}
      <div className="relative w-62 h-62 flex items-center justify-center mb-4">
        <img
          src={tracks[currentTrack].cover}
          alt={tracks[currentTrack].title}
          className={`w-full h-full object-cover rounded-full border-4 border-solid transition-all duration-700 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        />
      </div>

      <div className="text-2xl font-bold mb-6 text-solid">
        {tracks[currentTrack].title}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-8">
        <button
          onClick={handlePrevious}
          className="p-3 text-solid hover:text-midcolor transition-transform duration-200 hover:scale-110"
        >
          <SkipBack size={26} />
        </button>

        <button
          onClick={handlePlayPause}
          className="bg-solid text-white p-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {isPlaying ? <Pause size={26} /> : <Play size={26} />}
        </button>

        <button
          onClick={handleNext}
          className="p-3 text-solid hover:text-midcolor transition-transform duration-200 hover:scale-110"
        >
          <SkipForward size={26} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
