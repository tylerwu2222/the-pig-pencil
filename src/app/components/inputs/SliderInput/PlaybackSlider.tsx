"use client";

import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import PlayPauseButton from "../../buttons/iconButtons/PlayPauseButton";
interface PlaybackSliderProps {
  duration: number; // Total duration in seconds
  isPlaying: boolean; // Controlled play/pause state
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  progress: number; // Controlled current time
  setProgress: Dispatch<SetStateAction<number>>;
  stepSize?: number; // in seconds
  loop?: boolean; // Should playback loop
  showLabel?: boolean;
  // resetFunction?: () => void; // function that gets called when slider resets/is looped
}

export default function PlaybackSlider({
  duration,
  isPlaying,
  setIsPlaying,
  progress,
  setProgress,
  stepSize = 1,
  loop = false,
  showLabel = false,
  // resetFunction = () => {},
}: PlaybackSliderProps) {
  const intervalRef = useRef<number | null>(null);

  // visually updates slider value
  const handleSliderChange = (value: number[]) => {
    const currValue = value[0];
    if (currValue < duration) {
      //   console.log("slider changing, curr value", value[0]);
      setProgress((oldValue) => oldValue + stepSize);
    }
  };

  const handlePlayPauseChange = () => {
    // if paused -->
    if (!isPlaying) {
      // if reached duration, reset timer
      if (progress >= duration) {
        setProgress(0);
      }
      // play
      setIsPlaying(true);
    }
    // if playing --> pause
    else {
      setIsPlaying(false);
    }
  };

  // Updates internal playback time
  useEffect(() => {
    // if playing, update interval
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress((prevProgress) => {
          const newTime = prevProgress + stepSize;
          // if reached end of duration
          if (newTime >= duration) {
            //  reset time on loop
            if (loop) {
              return 0;
              // otherwise
            } else {
              setIsPlaying(false); // Stop playback interval
              return duration; // Freeze progress
            }
          }
          return newTime;
        });
      }, stepSize * 1000);
    }
    // if paused, clear interval
    else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration, loop, stepSize]);

  // useEffect(() => {
  //   if (progress === 0) {
  //     console.log('reset function called');
  //     resetFunction();
  //   }
  // }, [progress]);

  return (
    <div className="playback-slider flex w-full flex-row space-x-2">
      <div className="flex items-center space-x-2">
        {/* Play/Pause Button */}
        <PlayPauseButton
          isPlaying={isPlaying}
          onToggle={handlePlayPauseChange}
        />
      </div>
      {/* Slider */}
      <Slider
        value={[progress]}
        max={duration}
        step={1}
        onValueChange={handleSliderChange}
        className="w-full"
      />
      {/* Playback */}
      {showLabel && (
        <div>
          <Label className="text-sm font-medium text-gray-700">
            {Math.floor(progress)} / {duration}
          </Label>
        </div>
      )}
    </div>
  );
}
