import { MODULE_1 } from './module1_kotlin.js';
import { MODULE_2 } from './module2_compose_foundations.js';
import { MODULE_3 } from './module3_ui_components.js';
import { MODULE_4 } from './module4_modifiers.js';
import { MODULE_5 } from './module5_layout.js';
import { MODULE_6 } from './module6_state.js';
import { MODULE_7 } from './module7_viewmodel.js';
import { MODULE_8 } from './module8_side_effects.js';
import { MODULE_9 } from './module9_persistence.js';
import { MODULE_10 } from './module10_crud_forms.js';
import { MODULE_11 } from './module11_rest_api.js';
import { MODULE_12 } from './module12_notifications.js';

export const ALL_MODULES = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
  MODULE_5,
  MODULE_6,
  MODULE_7,
  MODULE_8,
  MODULE_9,
  MODULE_10,
  MODULE_11,
  MODULE_12
];

export const TOTAL_LESSONS = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

export function getLessonById(lessonId) {
  for (const module of ALL_MODULES) {
    const found = module.lessons.find(l => l.id === lessonId);
    if (found) {
      return { lesson: found, module };
    }
  }
  return null;
}

export function getNextAndPrevLesson(lessonId) {
  const allFlattened = [];
  for (const module of ALL_MODULES) {
    for (const lesson of module.lessons) {
      allFlattened.push({ lesson, module });
    }
  }

  const currentIndex = allFlattened.findIndex(item => item.lesson.id === lessonId);
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? allFlattened[currentIndex - 1] : null;
  const next = currentIndex < allFlattened.length - 1 ? allFlattened[currentIndex + 1] : null;

  return { prev, next };
}
