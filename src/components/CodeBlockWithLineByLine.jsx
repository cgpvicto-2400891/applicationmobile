import React, { useState } from 'react';
import { Copy, Check, Info, Code2, BookOpen } from 'lucide-react';

export default function CodeBlockWithLineByLine({ codeExample }) {
  const [copied, setCopied] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);

  if (!codeExample) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 space-y-4">
      {/* Code Header Bar */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            </span>
            <span className="font-mono text-slate-300 font-semibold ml-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              Exemple Kotlin (Jetpack Compose)
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Copier le code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>

        {/* Code View with selectable lines */}
        <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-slate-950 text-slate-100">
          <pre className="grid">
            {codeExample.code.split('\n').map((line, idx) => {
              const lineNum = idx + 1;
              const isSelected = selectedLine === lineNum;
              const hasExplanation = codeExample.lineByLine?.some(l => l.line === lineNum);

              return (
                <div
                  key={idx}
                  onClick={() => hasExplanation && setSelectedLine(isSelected ? null : lineNum)}
                  className={`flex items-start px-2 py-0.5 rounded transition-colors ${
                    isSelected ? 'bg-indigo-950/80 text-white ring-1 ring-indigo-500/50' : 
                    hasExplanation ? 'hover:bg-slate-900/80 cursor-pointer' : ''
                  }`}
                >
                  <span className="w-8 select-none text-slate-600 text-xs pt-0.5 font-mono text-right mr-4 shrink-0">
                    {lineNum}
                  </span>
                  <span className="flex-1 whitespace-pre">
                    {formatSyntax(line)}
                  </span>
                  {hasExplanation && (
                    <span className="text-[10px] uppercase font-sans tracking-wider px-1.5 py-0.5 ml-2 rounded bg-indigo-500/20 text-indigo-300 shrink-0">
                      Ligne {lineNum} 💡
                    </span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Line-by-Line Pedagogical Breakdown */}
      {codeExample.lineByLine && codeExample.lineByLine.length > 0 && (
        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-950/50 bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-900/60 dark:to-slate-950 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
            Explication pas-à-pas ligne par ligne
          </div>
          <p className="text-xs text-slate-500">
            Chaque terme technique et mot anglais est traduit pour une compréhension parfaite :
          </p>

          <div className="space-y-2.5 pt-1">
            {codeExample.lineByLine.map((item, idx) => {
              const isSelected = selectedLine === item.line;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedLine(isSelected ? null : item.line)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {item.line}
                    </span>
                    <code className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded truncate">
                      {item.code}
                    </code>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 pl-8 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Kotlin syntax highlighter helper
function formatSyntax(line) {
  if (line.trim().startsWith('//')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  if (line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Tokenize keywords
  const parts = line.split(/(\b(?:val|var|fun|data class|class|package|import|interface|object|sealed|return|if|else|when|is|by|null|true|false|suspend)\b|@\w+|"[^"]*")/g);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('"') && part.endsWith('"')) {
      return <span key={i} className="text-amber-300">{part}</span>;
    }
    if (part.startsWith('@')) {
      return <span key={i} className="text-emerald-400 font-semibold">{part}</span>;
    }
    if (['val', 'var', 'fun', 'class', 'data class', 'interface', 'object', 'sealed', 'by', 'suspend'].includes(part)) {
      return <span key={i} className="text-indigo-400 font-semibold">{part}</span>;
    }
    if (['return', 'if', 'else', 'when', 'is'].includes(part)) {
      return <span key={i} className="text-rose-400 font-medium">{part}</span>;
    }
    if (['true', 'false', 'null'].includes(part)) {
      return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}
