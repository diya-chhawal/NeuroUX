import { useState } from "react";

export function useBrain() {
  const [signals, setSignals] = useState({});

  const fireSignal = (name, value) => {
    setSignals(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return { signals, fireSignal };
}