import React, { useState, useEffect } from 'react';
import { X, Search, BookOpen, ChevronRight, Hash } from 'lucide-react';
import { ALL_MODULES } from '../data/modulesData.js';

export default function SearchModal({ isOpen, onClose, onSelectLesson }) {
  const [query, setQuery] = useState('');

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Search logic across modules, lessons, analogies and code
  const results = [];
  if (query.trim().length > 0) {
    const q = query.toLowerCase();

    for (const module of ALL_MODULES) {
      for (const lesson of module.lessons) {
        let matchScore = 0;
        let matchedSnippet = '';

        if (lesson.title.toLowerCase().includes(q)) {
          matchScore += 10;
          matchedSnippet = lesson.title;
        } else if (lesson.definition.toLowerCase().includes(q)) {
          matchScore += 5;
          matchedSnippet = lesson.definition.substring(0, 120) + '...';
        } else if (lesson.analogy.toLowerCase().includes(q)) {
          matchScore += 4;
          matchedSnippet = 'Analogie : ' + lesson.analogy.substring(0, 100) + '...';
        } else if (lesson.codeExample?.code?.toLowerCase().includes(q)) {
          matchScore += 3;
          matchedSnippet = 'Code source : ' + lesson.codeExample.code.split('\n').find(l => l.toLowerCase().includes(q))?.trim();
        }

        if (matchScore > 0) {
          results.push({
            module,
            lesson,
            matchScore,
            matchedSnippet
          });
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0 ml-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une notion, un composant, du code..."
            className="flex-1 py-2 text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
            ÉCHAP
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs space-y-2">
              <p>Tapez un mot-clé pour chercher dans l'ensemble des 12 modules.</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Column', 'Modifier', 'State', 'ViewModel', 'Room', 'Retrofit', 'Scaffold', 'LaunchedEffect'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-700 text-xs font-mono transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map(({ module, lesson, matchedSnippet }) => (
              <button
                key={lesson.id}
                onClick={() => {
                  onClose();
                  onSelectLesson(module.id, lesson.id);
                }}
                className="w-full p-3.5 rounded-2xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-start justify-between gap-3 group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="space-y-1 truncate flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    <span className="font-mono">Module {module.number}</span>
                    <span>•</span>
                    <span className="text-slate-400">{module.title}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </h4>
                  {matchedSnippet && (
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {matchedSnippet}
                    </p>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
              </button>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm">
              Aucun résultat trouvé pour "{query}". Essayez un autre terme technique.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
