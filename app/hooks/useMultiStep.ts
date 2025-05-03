//Este hook irá gerenciar a lógica do componente MultiStep

import { useState, useCallback } from 'react';

const useMultiStep = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);

  const next = useCallback(() => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, totalSteps));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  }, []);

  const goTo = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, totalSteps)));
  }, [totalSteps]);

  return {
    currentStep,
    next,
    prev,
    goTo,
    totalSteps,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
  };
};

export default useMultiStep;