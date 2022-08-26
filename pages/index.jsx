import { useEffect, useState } from "react";
import Head from "next/head";
import shuffle from "lodash.shuffle";

import questionsBank from "../data";

export default function HomePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleNextQuestion = (options) => {
    if (currentQuestion + 1 === questions.length) {
      setShowScore(true);
    }

    if (options.isCorrect) setScore((prev) => prev + 1);
    setCurrentQuestion((prev) => prev + 1);
  };

  const resetQuestionaire = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  };

  useEffect(() => {
    setQuestions(shuffle(questionsBank).slice(0, 5));
  }, []);

  return (
    <>
      <Head>
        <title>Questionaire</title>
        <link rel="shortcut icon" href="icon.svg" type="image/x-icon" />
      </Head>

      <div className="flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 bg-left-top h-screen select-none">
        <div className="rounded-2xl px-6 py-8 lg:p-10 lg:py-10 bg-slate-900 shadow-2xl text-white w-full lg:max-w-2xl mx-2.5">
          {showScore ? (
            <>
              <div className="py-8">
                <p className="text-center text-xl">
                  You scored {score} over {questions.length}.
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col lg:flex-row gap-x-10 gap-y-8">
              <div className="flex-1">
                <p className="text-3xl mb-4 text-slate-400">
                  Question {currentQuestion + 1}
                  <span className="text-lg font-light">/{questions?.length}</span>
                </p>
                <p className="text-xl text-white first-letter:text-4xl first-letter:-mt-2 font-light first-letter:font-medium">
                  {questions[currentQuestion]?.question}
                </p>
              </div>

              <div className="flex flex-col w-full flex-1 gap-4">
                {shuffle(questions[currentQuestion]?.options).map((options, index) => (
                  <button
                    className="border-[4px] border-blue-500/20 rounded-xl font-light p-1 cursor-pointer hover:bg-blue-500/20 transition-all ease-in duration-100 active:scale-95 text-left lg:p-2 lg:text-lg text-slate-400 hover:text-white hover:font-normal"
                    key={index}
                    onClick={() => handleNextQuestion(options)}
                  >
                    <p>{options.text}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {showScore && (
            <div
              className="p-5 py-3.5 bg-slate-700 shadow-inner rounded-md cursor-pointer text-center transition-all ease-out w-full lg:w-2/3 mx-auto hover:bg-slate-800 duration-300"
              onClick={resetQuestionaire}
            >
              <button className="text-lg">Retake Questionaire</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
