import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import LessonView from './components/LessonView.jsx';
import HomeDashboard from './components/HomeDashboard.jsx';
import GlossaryModal from './components/GlossaryModal.jsx';
import SearchModal from './components/SearchModal.jsx';
import DiagramsView from './components/DiagramsView.jsx';
import { ALL_MODULES, TOTAL_LESSONS, getLessonById } from './data/modulesData.js';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialiser selon la préférence système ou le localStorage
    const saved = localStorage.getItem('cegep_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Appliquer la classe dark sur <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cegep_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isDiagramsOpen, setIsDiagramsOpen] = useState(false);

  // Saved progress in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cegep_compose_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('cegep_compose_completed_lessons', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error('Erreur sauvegarde localStorage', e);
    }
  }, [completedLessonIds]);

  // Global Ctrl+K shortcut listener for instant search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectLesson = (moduleId, lessonId) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (lessonId) => {
    setCompletedLessonIds(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const handleNavigateHome = () => {
    setActiveModuleId(null);
    setActiveLessonId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active module & lesson objects
  const activeModule = activeModuleId ? ALL_MODULES.find(m => m.id === activeModuleId) : null;
  const activeLessonData = activeLessonId ? getLessonById(activeLessonId) : null;
  const activeLesson = activeLessonData?.lesson || null;

  const completedCount = completedLessonIds.length;
  const progressPercentage = Math.round((completedCount / TOTAL_LESSONS) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeModule={activeModule}
        activeLesson={activeLesson}
        progressPercentage={progressPercentage}
        completedCount={completedCount}
        totalLessons={TOTAL_LESSONS}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenDiagrams={() => setIsDiagramsOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigateHome={handleNavigateHome}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar Drawer */}
        <Sidebar
          activeModuleId={activeModuleId}
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onSelectLesson={handleSelectLesson}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-80 transition-all duration-300">
          {activeLesson && activeModule ? (
            <LessonView
              module={activeModule}
              lesson={activeLesson}
              isCompleted={completedLessonIds.includes(activeLesson.id)}
              onToggleComplete={handleToggleComplete}
              onSelectLesson={handleSelectLesson}
              onNavigateHome={handleNavigateHome}
            />
          ) : (
            <HomeDashboard
              completedLessonIds={completedLessonIds}
              onSelectLesson={handleSelectLesson}
              onOpenGlossary={() => setIsGlossaryOpen(true)}
              onOpenDiagrams={() => setIsDiagramsOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        onSelectLesson={handleSelectLesson}
      />

      {isDiagramsOpen && (
        <DiagramsView
          onClose={() => setIsDiagramsOpen(false)}
        />
      )}
    </div>
  );
}
