import { useEffect, useRef, useState } from "react";
import "./controlTechniques.css";
export default function ControlTechniques() {
  const [inputText, setInputText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [rateLimitedText, setRateLimitedText] = useState("");
  const debounceTimerRef = useRef(null);
  const noOfReqs = useRef(null);
  const provoked = useRef(false);
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedText(inputText);
    }, 1000);
  }, [inputText]);
  useEffect(() => {
    if (provoked.current) {
      if (noOfReqs.current < 5) {
        noOfReqs.current++;
        setRateLimitedText(inputText);
      } else {
        console.log("limit reached for this 3 secs");
      }
    } else {
      provoked.current = true;
      noOfReqs.current = 1;
      setRateLimitedText(inputText);
      setTimeout(() => {
        provoked.current = false;
      }, 3000);
    }
  }, [inputText]);
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
      <div>debounced 1 sec input</div>
      <input className="input" type="text" value={debouncedText} disabled />
      <div>rate limited 5 updates per 3 sec input</div>
      <input className="input" type="text" value={rateLimitedText} disabled />
    </div>
  );
}
