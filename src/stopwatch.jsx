import { useEffect, useState } from "react";
import "./stopwatch.css";

function Stopwatch() {
  const [secs, setSecs] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (play) {
      const id = setInterval(() => {
        setSecs((x) => x + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [play]);

  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600) % 24;
    const mins = Math.floor(s / 60) % 60;
    const secs = s % 60;
    return (
      hrs.toString().padStart(2, "0") +
      ":" +
      mins.toString().padStart(2, "0") +
      ":" +
      secs.toString().padStart(2, "0")
    );
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(secs)}</div>
      <button onClick={() => setPlay(!play)}>{play ? "Stop" : "Start"}</button>
      <button
        onClick={() => {
          setPlay(false);
          setSecs(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Stopwatch;
