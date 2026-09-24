import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export default function InteractiveQuiz({ quiz, onPassed }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return null;

  const isCorrect = selectedOption === quiz.correctIndex;

  const handleSelect = (index) => {
    if (submitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === quiz.correctIndex && onPassed) {
      onPassed();
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="my-8 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/50 to-purple-50/20 dark:from-slate-900 dark:to-indigo-950/20 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Exercice pratique d\'auto-évaluation</span>
        </div>
        {submitted && isCorrect && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Réussi !
          </span>
        )}
      </div>

      <p className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
        {quiz.question}
      </p>

      {/* Options List */}
      <div className="space-y-2.5 pt-2">
        {quiz.options.map((option, idx) => {
          let optionClasses = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-300';

          if (selectedOption === idx) {
            optionClasses = 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20';
          }

          if (submitted) {
            if (idx === quiz.correctIndex) {
              optionClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30 font-semibold';
            } else if (selectedOption === idx && !isCorrect) {
              optionClasses = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/30';
            } else {
              optionClasses = 'opacity-60 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500';
            }
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${optionClasses}`}
            >
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>

              {submitted && idx === quiz.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {submitted && selectedOption === idx && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all shadow-sm ${
              selectedOption !== null
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            Vérifier ma réponse
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recommencer l'exercice</span>
          </button>
        )}
      </div>

      {/* Explanation Feedback */}
      {submitted && (
        <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
          isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="font-bold uppercase tracking-wider">
            {isCorrect ? '🎉 Bravo, excellente réponse !' : '❌ Pas tout à fait, voici pourquoi :'}
          </div>
          <p>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
