import { useEffect, useRef, useState } from "react";
import "./controlTechniques.css";
export default function ControlTechniques() {
  const [inputText, setInputText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [rateLimitedText, setRateLimitedText] = useState("");
  const [throttledText, setThrottledText] = useState("");

  const debounceTimerRef = useRef(null);
  const noOfReqs = useRef(0);
  const callQ = useRef([]);
  const [Qprocessing, setQprocessing] = useState(false);
  const [count, setCount] = useState(0);
  const QprocessingIndex = useRef(0);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedText(inputText);
    }, 500);
  }, [inputText]);

  useEffect(() => {
    if (noOfReqs.current < 5) {
      if (noOfReqs.current === 0) {
        setTimeout(() => {
          noOfReqs.current = 0;
        }, 3000);
      }
      noOfReqs.current++;
      setRateLimitedText(inputText);
    }
  }, [inputText]);

  useEffect(() => {
    callQ.current.push(inputText);

    if (!Qprocessing) {
      setQprocessing(true);
    }
  }, [inputText]);

  useEffect(() => {
    if (Qprocessing) {
      const intId = setInterval(() => {
        setThrottledText(callQ.current[QprocessingIndex.current]);
        QprocessingIndex.current++;
        if (QprocessingIndex.current === callQ.current.length) {
          setQprocessing(false);
          callQ.current = [];
          QprocessingIndex.current = 0;
          clearInterval(intId);
        }
      }, 500);
    }
  }, [Qprocessing]);

  return (
    <div className="div">
      <div>un controlled input</div>
      <input
        className="input"
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <div>debounced 0.5 sec input</div>
      <input className="input" type="text" value={debouncedText} />
      <div>rate limited 5 updates per 3 sec input</div>
      <input className="input" type="text" value={rateLimitedText} />
      <div>throttled input time in btwn 0.5 sec</div>
      <input className="input" type="text" value={throttledText} />
    </div>
  );
}
