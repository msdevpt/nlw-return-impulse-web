import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent
  }: FeedbackContentStepProps){

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    onFeedbackSent();

    console.log(
      screenshot, 
      comment
    );
  }

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedback = feedbackTypes[feedbackType];

  return (
    <>
      <header>
        <button 
          type="button" 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedback.image.source} alt={feedback.image.alt} className="w-6 h-6" />
          {feedback.title}
          
          <CloseButton/>
        </span>
      </header>

      <form onSubmit={handleFormSubmit} className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Detail of the issue..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">

          <ScreenShotButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>

          <button
            type="submit"
            disabled={comment.length == 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Send feedback
          </button>
        </footer>

      </form>
    </>
    
  )
}