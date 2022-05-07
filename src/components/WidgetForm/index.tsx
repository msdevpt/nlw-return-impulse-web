import { useState } from "react";

import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problem',
    image: {
      source: bugImageUrl,
      alt: 'Image of a bug'
    }
  },
  IDEA: {
    title: 'Idea',
    image: {
      source: ideaImageUrl,
      alt: 'Image of a lightbulb'
    }
    
  },
  OTHER: {
    title: 'Other',
    image: {
      source: thoughtImageUrl,
      alt: 'Image of a cloud'
    }

  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
  const [feedbackType, SetFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    SetFeedbackType(null);
  }
  
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      { feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {feedbackType ? (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          ) : (
            <FeedbackTypeStep onFeedbackTypeChanged={SetFeedbackType} />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Made with ❤️ by <a href="https://rocketseat.com.br/" className="underline underline-offset-2">Rocketseat</a>
       </footer>
    </div>
  )
}