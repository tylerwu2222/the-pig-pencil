import React from "react";
import { Play, Pause } from "lucide-react";

interface PlayPauseButtonProps {
  isPlaying: boolean; // Controlled isPlaying state
  onToggle: () => void; // Function to handle toggle action
}

export default function PlayPauseButton({ isPlaying, onToggle }: PlayPauseButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="bg-gray-100 p-2 hover:bg-gray-200"
    >
      {isPlaying ? (
        <Pause className="h-3 w-3" />
      ) : (
        <Play className="h-3 w-3" />
      )}
    </button>
  );
}

