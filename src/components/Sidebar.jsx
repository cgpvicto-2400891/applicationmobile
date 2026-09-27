import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, BookOpen, Layers, X } from 'lucide-react';
import { ALL_MODULES } from '../data/modulesData.js';

export default function Sidebar({
  activeModuleId,
  activeLessonId,
  completedLessonIds,
  onSelectLesson,
  isOpen,
  onClose
}) {
  const [expandedModules, setExpandedModules] = useState(() => {
    // Open active module by default
    return { [activeModuleId || 'module-1']: true };
  });

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Table des matières ({ALL_MODULES.length} Modules)</span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modules List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {ALL_MODULES.map(module => {
            const isExpanded = !!expandedModules[module.id];
            const isActiveModule = activeModuleId === module.id;
            const completedInModule = module.lessons.filter(l => completedLessonIds?.includes(l.id)).length;
            const allCompleted = completedInModule === module.lessons.length && module.lessons.length > 0;

            return (
              <div key={module.id} className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800/80">
                {/* Module Accordion Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full p-2.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isActiveModule
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {module.number}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{module.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{module.lessons.length} leçon{module.lessons.length > 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {allCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-[10px] font-mono font-medium text-slate-400">
                        {completedInModule}/{module.lessons.length}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Lessons in Module */}
                {isExpanded && (
                  <div className="pl-4 pr-1 py-1 space-y-0.5 bg-slate-50/40 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800/60">
                    {module.lessons.map(lesson => {
                      const isActiveLesson = activeLessonId === lesson.id;
                      const isLessonCompleted = completedLessonIds?.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(module.id, lesson.id);
                            if (window.innerWidth < 1024) onClose();
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isActiveLesson
                              ? 'bg-indigo-600 text-white font-medium shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="truncate flex-1">{lesson.title}</span>

                          {isLessonCompleted ? (
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                              isActiveLesson ? 'text-white' : 'text-emerald-500'
                            }`} />
                          ) : (
                            <Circle className={`w-3 h-3 shrink-0 opacity-40 ${
                              isActiveLesson ? 'text-white' : 'text-slate-400'
                            }`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
