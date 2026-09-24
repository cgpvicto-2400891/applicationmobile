import React, { useState } from 'react';
import { Smartphone, Wifi, BatteryMedium, Signal, Sun, Moon } from 'lucide-react';

export default function PhoneMockup({ mockup, title }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div className="flex items-center justify-between w-full max-w-sm mb-2 px-2 text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          Rendu visuel simulé Android
        </span>
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
          title="Basculer aperçu clair/sombre"
        >
          {isDark ? <Sun className="w-3 h-3 text-amber-500" /> : <Moon className="w-3 h-3 text-indigo-500" />}
          <span>{isDark ? 'Mode sombre' : 'Mode clair'}</span>
        </button>
      </div>

      {/* Realistic Pixel Frame */}
      <div className="relative w-full max-w-sm rounded-[2.5rem] p-3 bg-slate-900 shadow-2xl ring-1 ring-slate-800 border-4 border-slate-700">
        {/* Dynamic Island / Punch Hole Camera */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black ring-1 ring-slate-800 z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900/80"></div>
        </div>

        {/* Screen Bezel */}
        <div className={`relative w-full h-[460px] rounded-[2rem] overflow-hidden flex flex-col justify-between transition-colors duration-300 ${
          isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
        }`}>
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold tracking-tight z-20 select-none opacity-80">
            <span>09:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col">
            {renderMockupContent(mockup, isDark)}
          </div>

          {/* Android Navigation Bar Bar Indicator */}
          <div className="py-2 flex justify-center items-center select-none">
            <div className={`w-28 h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
          </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500 text-center italic max-w-sm">
        {title || 'Représentation fidèle de l\'affichage de votre Composable sur un Pixel 8.'}
      </p>
    </div>
  );
}

function renderMockupContent(mockup, isDark) {
  if (!mockup) return <div className="text-sm text-slate-400">Aucun aperçu disponible</div>;

  const cardBg = isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';

  switch (mockup.type) {
    case 'memory-box':
      return (
        <div className="space-y-4 my-auto">
          <div className="text-xs font-semibold text-center text-emerald-600 uppercase tracking-wider">État des variables en mémoire</div>
          {mockup.items.map((item, idx) => (
            <div key={idx} className={`p-3 rounded-xl border ${item.color}`}>
              <div className="text-xs font-mono font-bold">{item.label}</div>
              <div className="text-base font-semibold mt-1">{item.value}</div>
              <div className="text-[11px] mt-1 opacity-90">{item.badge}</div>
            </div>
          ))}
        </div>
      );

    case 'types-table':
      return (
        <div className="space-y-2 my-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Types fondamentaux</div>
          {mockup.types.map((t, idx) => (
            <div key={idx} className={`p-2.5 rounded-lg border text-xs flex justify-between items-center ${cardBg}`}>
              <div>
                <span className="font-mono font-bold text-emerald-600">{t.name}</span>
                <p className={`text-[10px] ${textMuted}`}>{t.desc}</p>
              </div>
              <span className="font-mono bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">{t.example}</span>
            </div>
          ))}
        </div>
      );

    case 'phone-screen':
      return (
        <div className="my-auto p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center">
          <div className="text-lg font-semibold">{mockup.content}</div>
          <div className={`text-xs mt-2 ${textMuted}`}>{mockup.details}</div>
        </div>
      );

    case 'layout-column':
      return (
        <div className="my-auto flex flex-col gap-2 p-3 border-2 border-dashed border-blue-400/60 rounded-xl bg-blue-50/20">
          <span className="text-[10px] font-bold text-blue-500 uppercase">Column {'{ }'}</span>
          {mockup.items.map((item, idx) => (
            <div key={idx} className="p-3 bg-blue-500 text-white rounded-lg shadow-sm font-medium text-xs text-center">
              {item}
            </div>
          ))}
        </div>
      );

    case 'layout-row':
      return (
        <div className="my-auto flex flex-col gap-2 p-3 border-2 border-dashed border-emerald-400/60 rounded-xl bg-emerald-50/20">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Row {'{ }'}</span>
          <div className="flex gap-1.5 justify-center items-center">
            {mockup.items.map((item, idx) => (
              <div key={idx} className="px-2.5 py-2 bg-emerald-600 text-white rounded-lg shadow-sm font-medium text-[11px] text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      );

    case 'layout-box':
      return (
        <div className="my-auto relative h-48 border-2 border-dashed border-purple-400/60 rounded-xl bg-purple-50/20 flex items-center justify-center">
          <span className="absolute top-2 left-2 text-[10px] font-bold text-purple-600 uppercase">Box (Z-Index)</span>
          <div className="w-36 h-36 bg-slate-300 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shadow">
            {mockup.layer1}
          </div>
          <div className="absolute w-28 h-28 bg-purple-600/90 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-lg p-2 text-center">
            {mockup.layer2}
          </div>
        </div>
      );

    case 'image-preview':
      return (
        <div className="my-auto flex flex-col items-center justify-center p-6 border rounded-xl text-center space-y-3">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-4xl shadow-md">
            🎓
          </div>
          <div className="font-semibold text-sm">{mockup.badge}</div>
          <div className={`text-xs ${textMuted}`}>{mockup.altText}</div>
        </div>
      );

    case 'network-image':
      return (
        <div className="my-auto flex flex-col items-center justify-center p-6 border rounded-xl text-center space-y-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-4xl shadow-md text-white">
            🧑‍💻
          </div>
          <div className="font-semibold text-xs text-indigo-500">{mockup.status}</div>
          <div className={`text-xs ${textMuted}`}>{mockup.preview}</div>
        </div>
      );

    case 'button-preview':
      return (
        <div className="my-auto flex flex-col items-center justify-center space-y-4">
          <button className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95">
            {mockup.buttonText}
          </button>
          <span className={`text-[11px] ${textMuted}`}>{mockup.effect}</span>
        </div>
      );

    case 'text-field-preview':
      return (
        <div className="my-auto space-y-4 p-2">
          <div className="relative">
            <span className="absolute -top-2.5 left-3 bg-white dark:bg-slate-950 px-1 text-[11px] font-semibold text-violet-600">
              {mockup.label}
            </span>
            <div className="w-full px-4 py-3 rounded-lg border-2 border-violet-600 text-sm font-medium">
              {mockup.value}
            </div>
          </div>
          <div className={`text-xs text-center ${textMuted}`}>{mockup.border}</div>
        </div>
      );

    case 'icon-preview':
      return (
        <div className="my-auto flex flex-col items-center justify-center space-y-3">
          <div className="text-6xl text-rose-500 animate-pulse">{mockup.symbol}</div>
          <div className="font-mono text-xs text-slate-500">{mockup.name}</div>
        </div>
      );

    case 'card-preview':
      return (
        <div className="my-auto p-2">
          <div className={`p-4 rounded-2xl shadow-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h4 className="font-bold text-base mb-1">{mockup.headline}</h4>
            <p className={`text-xs leading-relaxed ${textMuted}`}>{mockup.body}</p>
          </div>
          <p className="text-[11px] text-center text-slate-400 mt-2">{mockup.elevation}</p>
        </div>
      );

    case 'modal-preview':
      return (
        <div className="my-auto relative p-4 rounded-2xl bg-black/40 backdrop-blur-xs flex items-center justify-center">
          <div className={`w-full p-4 rounded-2xl shadow-2xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="font-bold text-sm text-red-500 mb-2">{mockup.header}</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mb-4">{mockup.body}</div>
            <div className="flex justify-end gap-2 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100">{mockup.actions[0]}</span>
              <span className="px-3 py-1.5 rounded-lg bg-red-600 text-white shadow-sm">{mockup.actions[1]}</span>
            </div>
          </div>
        </div>
      );

    case 'snackbar-preview':
      return (
        <div className="mt-auto mb-2 w-full p-3 bg-slate-900 text-white rounded-lg shadow-xl flex items-center justify-between text-xs">
          <span>{mockup.message}</span>
          <span className="text-violet-400 font-bold uppercase text-[11px] cursor-pointer">{mockup.actionText}</span>
        </div>
      );

    case 'scaffold-anatomy':
      return (
        <div className="my-auto flex flex-col h-full justify-between space-y-2">
          <div className="p-3 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow">{mockup.top}</div>
          <div className="p-6 border-2 border-dashed border-indigo-300 rounded-lg text-xs text-center font-medium my-auto">
            {mockup.content}
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg text-center">
            {mockup.bottom}
          </div>
        </div>
      );

    default:
      return (
        <div className="my-auto p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <div className="text-xs font-bold text-emerald-600 uppercase">{mockup.title || 'Aperçu'}</div>
          {Object.entries(mockup).map(([key, value]) => {
            if (key === 'type' || key === 'title') return null;
            return (
              <div key={key} className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold">{key}: </span>{String(value)}
              </div>
            );
          })}
        </div>
      );
  }
}
