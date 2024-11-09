"use client";  // Add this line at the top
import { useEffect, useState } from 'react';
import styles from './countdown-timer.module.css'; // Make sure this path is correct

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
    let interval: ReturnType<typeof setInterval>; 

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

    return () => clearInterval(interval); // Clean up the interval
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
    <div className={styles.container}>
      <div className={styles.timerBox}>
        <h1 className={styles.heading}>Countdown Timer</h1>
        
        {/* User input for setting time */}
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          placeholder="Set time in minutes"
          className={styles.input}
        />
        
        <div className={styles.timerDisplay}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className={styles.buttonContainer}>
          {!isActive && isPaused && (
            <button onClick={startTimer} className={styles.button}>
              Start
            </button>
          )}
          {isActive && !isPaused && (
            <button onClick={pauseTimer} className={styles.button}>
              Pause
            </button>
          )}
          <button onClick={resetTimer} className={styles.button}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

// Usage example
// You can now use <CountdownTimer /> in your layout or another component.
