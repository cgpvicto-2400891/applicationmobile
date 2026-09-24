import React from 'react';
import { ALL_MODULES, TOTAL_LESSONS } from '../data/modulesData.js';
import { BookOpen, CheckCircle, Smartphone, ArrowRight, GitFork, BookMarked, Sparkles, ShieldCheck, Trophy } from 'lucide-react';

export default function HomeDashboard({
  completedLessonIds,
  onSelectLesson,
  onOpenGlossary,
  onOpenDiagrams
}) {
  const completedCount = completedLessonIds?.length || 0;
  const progressPercentage = Math.round((completedCount / TOTAL_LESSONS) * 100);

  // Find next uncompleted lesson to recommend
  let nextLesson = null;
  let nextModule = null;
  for (const mod of ALL_MODULES) {
    for (const les of mod.lessons) {
      if (!completedLessonIds?.includes(les.id)) {
        nextLesson = les;
        nextModule = mod;
        break;
      }
    }
    if (nextLesson) break;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spécialement conçu pour les étudiants de Cégep</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Apprenez Android avec <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
              Kotlin & Jetpack Compose
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Une approche 100% vulgarisée, sans jargon inutile. Chaque notion est séparée, illustrée d'une analogie du quotidien, décortiquée ligne par ligne avec sa simulation d'écran Android fidèle.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {nextLesson ? (
              <button
                onClick={() => onSelectLesson(nextModule.id, nextLesson.id)}
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>{completedCount === 0 ? 'Commencer le Module 1' : 'Reprendre mon apprentissage'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="px-6 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>Félicitations, programme 100% terminé !</span>
              </div>
            )}

            <button
              onClick={onOpenDiagrams}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-sm border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <GitFork className="w-4 h-4 text-purple-400" />
              <span>Voir les schémas interactifs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Progress & Pedagogy Principles Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {progressPercentage}%
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Progression globale
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500">
            {completedCount} leçon{completedCount > 1 ? 's' : ''} validée{completedCount > 1 ? 's' : ''} sur un total de {TOTAL_LESSONS}.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Règle d'or : Séparation stricte
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Pas de mélange confus ! L'UI (Module 3) est vue séparément du style (Module 4) et de la logique d'état (Module 6). Vous apprenez chaque concept sans être submergé.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
            <BookMarked className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Glossaire & Traduction
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Tous les termes anglais ou jargons techniques sont systématiquement traduits et expliqués pour les débutants.
          </p>
          <button
            onClick={onOpenGlossary}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Ouvrir le glossaire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 12 Modules Roadmap Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Programme du cours : Les 12 Modules
          </h2>
          <p className="text-xs text-slate-500">
            Suivez la progression ordonnée du cours pour assimiler les fondations pas à pas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_MODULES.map(module => {
            const completedCountInMod = module.lessons.filter(l => completedLessonIds?.includes(l.id)).length;
            const isFullyCompleted = completedCountInMod === module.lessons.length && module.lessons.length > 0;

            return (
              <div
                key={module.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                      {module.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {completedCountInMod}/{module.lessons.length} fait{completedCountInMod > 1 ? 's' : ''}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {module.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {module.lessons.length} notion{module.lessons.length > 1 ? 's' : ''}
                  </span>

                  <button
                    onClick={() => onSelectLesson(module.id, module.lessons[0].id)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
