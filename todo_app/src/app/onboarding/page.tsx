'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SeededButton } from '@/components/seeded';
import { isSeedEnabled } from '@/lib/seeds';

const steps = [
  {
    title: 'Welcome to TodoApp',
    description: 'Your personal productivity companion. Manage tasks, projects, and schedules all in one place.',
  },
  {
    title: 'Create Tasks',
    description: 'Add tasks with titles, descriptions, due dates, and tags. Organize them by priority.',
  },
  {
    title: 'Organize Projects',
    description: 'Group related tasks into projects. Track progress and manage complex workflows.',
  },
  {
    title: 'Plan Your Schedule',
    description: 'Use the calendar view to see your tasks by day or week. Never miss a deadline.',
  },
  {
    title: 'Search & Filter',
    description: 'Find tasks quickly with powerful search and filtering options.',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const skipTooEasy = isSeedEnabled('onboarding', 'skip_too_easy');

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  const handleFinish = () => {
    router.push('/tasks');
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="onboarding-complete-title">
            You&apos;re all set!
          </h1>
          <p className="text-gray-600 mb-8">
            Ready to start managing your tasks efficiently.
          </p>
          <SeededButton seedPage="onboarding" onClick={handleFinish} data-testid="onboarding-get-started">
            Get Started
          </SeededButton>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                data-testid={`onboarding-dot-${index}`}
              />
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="onboarding-step-title">
            {step.title}
          </h1>
          <p className="text-gray-600 text-lg" data-testid="onboarding-step-description">
            {step.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <SeededButton
            seedPage="onboarding"
            variant={skipTooEasy ? 'primary' : 'secondary'}
            onClick={handleSkip}
            data-testid="onboarding-skip"
          >
            Skip
          </SeededButton>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <SeededButton
                seedPage="onboarding"
                variant="secondary"
                onClick={handlePrev}
                data-testid="onboarding-prev"
              >
                Previous
              </SeededButton>
            )}
            <SeededButton
              seedPage="onboarding"
              onClick={handleNext}
              data-testid="onboarding-next"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </SeededButton>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Want to explore on your own?{' '}
          <button
            onClick={handleSkip}
            className="text-blue-600 hover:underline"
            data-testid="onboarding-explore"
          >
            Go to Home
          </button>
        </p>
      </div>
    </div>
  );
}
