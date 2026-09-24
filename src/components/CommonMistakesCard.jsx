import React from 'react';
import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

export default function CommonMistakesCard({ mistakes }) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/60 to-orange-50/30 dark:from-amber-950/20 dark:to-slate-900 p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-bold text-sm tracking-wide uppercase">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>Erreurs fréquentes pour un débutant & Comment les éviter</span>
      </div>

      <div className="space-y-4">
        {mistakes.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/40 shadow-xs space-y-3">
            {/* The Mistake */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                ✕
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Le piège classique :</span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {item.mistake}
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="flex items-start gap-3 pl-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">La bonne pratique :</span>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {item.fix}
                </p>
              </div>
            </div>

            {/* Pedagogical Explanation */}
            {item.explanation && (
              <div className="flex items-start gap-3 pl-1 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="italic leading-relaxed">
                  <span className="font-semibold not-italic text-slate-600 dark:text-slate-300">Pourquoi ? </span>
                  {item.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
