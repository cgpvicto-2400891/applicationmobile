import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ module, lesson, onNavigateHome, onNavigateModule }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap select-none">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
        title="Retour au sommaire général"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Accueil</span>
      </button>

      {module && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <button
            onClick={() => onNavigateModule && onNavigateModule(module.id)}
            className="hover:text-indigo-600 font-medium transition-colors cursor-pointer truncate max-w-[200px]"
            title={`Module ${module.number} : ${module.title}`}
          >
            Module {module.number} : {module.title}
          </button>
        </>
      )}

      {lesson && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[240px]">
            {lesson.title}
          </span>
        </>
      )}
    </nav>
  );
}
