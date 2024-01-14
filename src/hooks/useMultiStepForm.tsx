import { useState, ReactElement } from "react";

export default function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((prevIndex: number) => {
      return prevIndex >= steps.length - 1 ? prevIndex : prevIndex + 1;
    });
  }

  function back() {
    setCurrentStepIndex((prevIndex: number) => {
      return prevIndex <= 0 ? prevIndex : prevIndex - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
  };
}
