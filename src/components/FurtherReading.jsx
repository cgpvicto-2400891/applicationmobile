import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Bookmark } from 'lucide-react';

export default function FurtherReading({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Bookmark className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Pour aller plus loin (Optionnel)
          </span>
          <span className="text-xs text-slate-400 font-normal">
            ({items.length} ressource{items.length > 1 ? 's' : ''})
          </span>
        </div>

        <div className="text-slate-400 flex items-center gap-1 text-xs font-medium">
          <span>{isOpen ? 'Replier' : 'Déplier'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 pt-1 space-y-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <p className="text-slate-500 italic">
            Pour les étudiants curieux qui souhaitent approfondir les détails ou consulter les notes originales :
          </p>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    {item.title}
                  </div>
                  {item.note && (
                    <p className="text-slate-600 dark:text-slate-400">{item.note}</p>
                  )}
                </div>

                {item.url && item.url !== '#' && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors shrink-0"
                    title="Ouvrir le lien"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
