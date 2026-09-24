import React from 'react';
import Breadcrumbs from './Breadcrumbs.jsx';
import PhoneMockup from './PhoneMockup.jsx';
import CodeBlockWithLineByLine from './CodeBlockWithLineByLine.jsx';
import CommonMistakesCard from './CommonMistakesCard.jsx';
import InteractiveQuiz from './InteractiveQuiz.jsx';
import FurtherReading from './FurtherReading.jsx';
import { Sparkles, Terminal, CheckCircle2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { getNextAndPrevLesson } from '../data/modulesData.js';

export default function LessonView({
  module,
  lesson,
  isCompleted,
  onToggleComplete,
  onSelectLesson,
  onNavigateHome
}) {
  if (!module || !lesson) return null;

  const { prev, next } = getNextAndPrevLesson(lesson.id);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        module={module}
        lesson={lesson}
        onNavigateHome={onNavigateHome}
        onNavigateModule={() => {}}
      />

      {/* Lesson Header Title */}
      <header className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
            Module {module.number}/12 • Leçon
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complétée
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lesson.title}
        </h1>
      </header>

      {/* SECTION 1 : Analogie / Mise en contexte */}
      <section className="rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-l-4 border-amber-500 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>1. En clair : Analogie du quotidien</span>
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
          « {lesson.analogy} »
        </p>
      </section>

      {/* SECTION 2 : Définition technique simple */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-4 h-4" />
          <span>2. Définition technique simple</span>
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {lesson.definition}
        </p>
      </section>

      {/* SECTION 3 : Exemple de code minimal avec explication ligne par ligne */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <Terminal className="w-4 h-4 text-indigo-500" />
          <span>3. Exemple de code minimal & Explication ligne par ligne</span>
        </div>
        <CodeBlockWithLineByLine codeExample={lesson.codeExample} />
      </section>

      {/* SECTION 4 : Visualisation (Rendu visuel simulé Android) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>4. Rendu visuel simulé à l'écran</span>
        </div>
        <PhoneMockup mockup={lesson.visualMockup} title={`Aperçu simulé pour : ${lesson.title}`} />
      </section>

      {/* SECTION 5 : Erreurs fréquentes pour un débutant + comment les éviter */}
      <section>
        <CommonMistakesCard mistakes={lesson.commonMistakes} />
      </section>

      {/* SECTION 6 : Exercice pratique très court */}
      <section>
        <InteractiveQuiz
          quiz={lesson.quiz}
          onPassed={() => {
            if (!isCompleted) onToggleComplete(lesson.id);
          }}
        />
      </section>

      {/* SECTION 7 : Pour aller plus loin (Optionnel, replié par défaut) */}
      {lesson.furtherReading && lesson.furtherReading.length > 0 && (
        <section>
          <FurtherReading items={lesson.furtherReading} />
        </section>
      )}

      {/* Completion & Next/Prev Navigation */}
      <footer className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Avez-vous bien assimilé cette leçon ?
            </div>
            <p className="text-xs text-slate-500">
              Cochez-la pour enregistrer votre progression dans votre navigateur.
            </p>
          </div>

          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Leçon terminée !' : 'Marquer comme terminée'}</span>
          </button>
        </div>

        {/* Bottom Pagination Links */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {prev ? (
            <button
              onClick={() => onSelectLesson(prev.module.id, prev.lesson.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group flex-1 max-w-xs"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:-translate-x-0.5 transition-all" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Précédent</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                  {prev.lesson.title}
                </span>
              </div>
            </button>
          ) : <div />}

          {next && (
            <button
              onClick={() => onSelectLesson(next.module.id, next.lesson.id)}
              className="flex items-center justify-end gap-2 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-right transition-colors cursor-pointer group flex-1 max-w-xs ml-auto"
            >
              <div className="truncate">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Suivant</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                  {next.lesson.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}
