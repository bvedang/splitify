import {useState} from "react";

function useStepManager(initialStep: number = 1, maxStep: number): [step: number, nextStep: () => void, prevStep: () => void, resetStep: () => void] {
    const [step, setStep] = useState<number>(initialStep);

    const nextStep = () => {
        setStep(prev => (prev < maxStep ? prev + 1 : prev));
    }

    const prevStep = () => {
        setStep(prev => (prev > initialStep ? prev - 1 : prev));
    }

    const resetStep = () => {
        setStep(initialStep);
    }

    return [step, nextStep, prevStep, resetStep]
}

export default useStepManager;