import React, { useState } from 'react';
import { X, Search, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossaryData.js';

export default function GlossaryModal({ isOpen, onClose, onSelectLesson }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredTerms = GLOSSARY_TERMS.filter(item => {
    const q = searchTerm.toLowerCase();
    return (
      item.term.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.analogy.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Glossaire technique vulgarisé
              </h3>
              <p className="text-xs text-slate-500">
                Chaque terme anglais ou mot d'initié expliqué avec des mots simples pour les étudiants de cégep.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un mot-clé (ex: Composable, Recomposition, State Hoisting, DAO...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Terms List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {item.term}
                      <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {item.translation}
                      </span>
                    </h4>
                  </div>

                  {item.lessonId && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectLesson(`module-${item.module}`, item.lessonId);
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 cursor-pointer"
                    >
                      <span>Voir leçon</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Definition */}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>

                {/* Analogy Box */}
                {item.analogy && (
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Analogie imagée : </span>
                      {item.analogy}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucun terme technique trouvé pour "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
