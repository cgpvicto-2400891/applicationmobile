import React from 'react';
import { Search, BookMarked, GitFork, Menu, CheckCircle, Smartphone } from 'lucide-react';

export default function Header({
  activeModule,
  activeLesson,
  progressPercentage,
  completedCount,
  totalLessons,
  onOpenSearch,
  onOpenGlossary,
  onOpenDiagrams,
  onToggleSidebar,
  onNavigateHome
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Android Compose
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Cégep
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Guide d'apprentissage mobile</p>
            </div>
          </button>
        </div>

        {/* Center: Persistent Module Position ("Module 3/12") */}
        <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-xs">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            {activeModule ? `Module ${activeModule.number}/12` : 'Sommaire'}
          </span>
          {activeModule && (
            <>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                {activeModule.title}
              </span>
            </>
          )}
        </div>

        {/* Right Side: Tools & Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-300"
            title="Rechercher une notion (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rechercher...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 text-slate-500 rounded border border-slate-300 dark:border-slate-600">
              Ctrl+K
            </kbd>
          </button>

          {/* Interactive Diagrams */}
          <button
            onClick={onOpenDiagrams}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer"
            title="Voir les schémas d'architecture interactifs"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Schémas</span>
          </button>

          {/* Global Glossary */}
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
            title="Consulter le glossaire des termes vulgarisés"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Glossaire</span>
          </button>

          {/* Progress Indicator */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Progression</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {completedCount}/{totalLessons} ({progressPercentage}%)
              </div>
            </div>
            <div className="w-16 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Mobile Module Banner */}
      <div className="md:hidden px-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-xs flex justify-between items-center text-slate-700 dark:text-slate-300">
        <span className="font-bold text-indigo-600 dark:text-indigo-400">
          {activeModule ? `Module ${activeModule.number}/12` : 'Sommaire'}
        </span>
        <span className="text-[11px] text-slate-500 truncate max-w-[220px]">
          {activeModule ? activeModule.title : 'Guide Android Cégep'}
        </span>
      </div>
    </header>
  );
}
