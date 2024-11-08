"use client";  // Add this line at the top
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

const CountdownTimer = ({
  initialMinutes = 0,
  initialSeconds = 0,
}: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [inputMinutes, setInputMinutes] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, isActive, isPaused]);

  const startTimer = () => {
    setMinutes(inputMinutes);
    setSeconds(0);
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(true);
    setSeconds(initialSeconds);
    setMinutes(initialMinutes);
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <input
        type="number"
        value={inputMinutes}
        onChange={(e) => setInputMinutes(Number(e.target.value))}
        placeholder="Set time in minutes"
      />
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>
        {!isActive && isPaused && (
          <button onClick={startTimer}>Start</button>
        )}
        {isActive && !isPaused && (
          <button onClick={pauseTimer}>Pause</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default function Page() {
    return <CountdownTimer initialMinutes={10} />;
}
