import { Routes } from '@angular/router';
import { CourseShellComponent } from './course-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: CourseShellComponent,
  },
  {
    path: 'phase/:phaseId',
    component: CourseShellComponent,
  },
  {
    path: 'phase/:phaseId/section/:sectionSlug',
    component: CourseShellComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
