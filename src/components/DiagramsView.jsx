import React, { useState } from 'react';
import { DIAGRAMS_DATA } from '../data/diagramsData.js';
import { GitFork, RefreshCw, Layout, Layers, ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export default function DiagramsView({ onClose }) {
  const [activeTab, setActiveTab] = useState('lifecycle'); // 'lifecycle' | 'hierarchy' | 'architecture'
  const [lifecycleStep, setLifecycleStep] = useState(0);
  const [selectedLayoutType, setSelectedLayoutType] = useState('column');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Schémas & Diagrammes interactifs d'architecture
              </h3>
              <p className="text-xs text-slate-500">
                Visualisez les 3 mécaniques clés de Jetpack Compose et d'Android
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-2 gap-2">
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'lifecycle'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>1. Cycle de vie Composable</span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'hierarchy'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>2. Hiérarchie Column / Row / Box</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. Flux Clean Architecture (UDF)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: LIFECYCLE */}
          {activeTab === 'lifecycle' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {DIAGRAMS_DATA.composableLifecycle.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {DIAGRAMS_DATA.composableLifecycle.subtitle}
                </p>
              </div>

              {/* Interactive Step Navigator */}
              <div className="grid grid-cols-3 gap-2">
                {DIAGRAMS_DATA.composableLifecycle.steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setLifecycleStep(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      lifecycleStep === idx
                        ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 ring-2 ring-purple-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400">{step.badge}</div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">{step.phase}</div>
                  </button>
                ))}
              </div>

              {/* Active Step Showcase */}
              {(() => {
                const current = DIAGRAMS_DATA.composableLifecycle.steps[lifecycleStep];
                return (
                  <div className="p-6 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-br from-purple-50/40 to-white dark:from-slate-900 dark:to-purple-950/20 shadow-sm space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-bold text-slate-900 dark:text-white">
                        {current.phase} : {current.title}
                      </h5>
                      <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60">
                        Étape {lifecycleStep + 1} / 3
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {current.description}
                    </p>

                    <div className="rounded-xl overflow-hidden bg-slate-950 p-4 font-mono text-xs text-purple-200 border border-slate-800">
                      <pre>{current.codeSnippet}</pre>
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        disabled={lifecycleStep === 0}
                        onClick={() => setLifecycleStep(prev => Math.max(0, prev - 1))}
                        className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold disabled:opacity-30 cursor-pointer"
                      >
                        Précédent
                      </button>
                      <button
                        disabled={lifecycleStep === 2}
                        onClick={() => setLifecycleStep(prev => Math.min(2, prev + 1))}
                        className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold disabled:opacity-30 cursor-pointer"
                      >
                        Étape suivante ➔
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 2: HIERARCHY */}
          {activeTab === 'hierarchy' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {DIAGRAMS_DATA.layoutHierarchy.title}
                </h4>
                <p className="text-xs text-slate-500">
                  Cliquez sur chaque conteneur pour observer son axe d'alignement
                </p>
              </div>

              {/* Container Selector */}
              <div className="grid grid-cols-3 gap-3">
                {DIAGRAMS_DATA.layoutHierarchy.types.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedLayoutType(t.id)}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedLayoutType === t.id
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">{t.name}</div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">{t.direction}</div>
                  </button>
                ))}
              </div>

              {/* Layout Interactive Visualizer */}
              {(() => {
                const layout = DIAGRAMS_DATA.layoutHierarchy.types.find(t => t.id === selectedLayoutType);
                return (
                  <div className="grid md:grid-cols-2 gap-6 items-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                    <div className="space-y-3">
                      <h5 className="text-base font-bold text-slate-900 dark:text-white">
                        {layout.name}
                      </h5>
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {layout.mainAxis}
                      </div>
                      <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {layout.crossAxis}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {layout.explanation}
                      </p>
                    </div>

                    {/* Live Box Representation */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-h-[220px] flex items-center justify-center">
                      {layout.id === 'column' && (
                        <div className="flex flex-col gap-2 w-full max-w-xs">
                          {layout.items.map((item, idx) => (
                            <div key={idx} className="p-3 bg-indigo-600 text-white font-medium text-xs rounded-xl shadow-xs text-center">
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      {layout.id === 'row' && (
                        <div className="flex gap-2 w-full justify-center">
                          {layout.items.map((item, idx) => (
                            <div key={idx} className="p-3 bg-emerald-600 text-white font-medium text-xs rounded-xl shadow-xs text-center flex-1">
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      {layout.id === 'box' && (
                        <div className="relative w-48 h-40 flex items-center justify-center">
                          <div className="w-40 h-32 bg-slate-300 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shadow">
                            {layout.items[0]}
                          </div>
                          <div className="absolute w-28 h-20 bg-purple-600 text-white rounded-xl flex items-center justify-center text-xs font-bold shadow-lg">
                            {layout.items[1]}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: CLEAN ARCHITECTURE FLOW */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {DIAGRAMS_DATA.cleanArchitectureFlow.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {DIAGRAMS_DATA.cleanArchitectureFlow.subtitle}
                </p>
              </div>

              {/* Visual Pipeline Nodes */}
              <div className="grid md:grid-cols-4 gap-3 relative">
                {DIAGRAMS_DATA.cleanArchitectureFlow.nodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className={`p-4 rounded-2xl border-2 flex flex-col justify-between space-y-2 shadow-xs ${node.color}`}
                  >
                    <div>
                      <div className="text-2xl mb-1">{node.icon}</div>
                      <div className="text-xs font-extrabold">{node.name}</div>
                      <div className="text-[11px] font-semibold opacity-90 mt-0.5">{node.role}</div>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-95">
                      {node.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                  Règle d'or de l'Unidirectional Data Flow (UDF) :
                </div>
                <p className="leading-relaxed">
                  • <strong>Les Données (State)</strong> descendent toujours des sources vers l'UI : Room ➔ Repository ➔ ViewModel ➔ Composable.
                </p>
                <p className="leading-relaxed">
                  • <strong>Les Événements (Events)</strong> remontent toujours de l'UI vers la logique : Clic utilisateur ➔ Appel ViewModel ➔ Mutation Repository.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
