// app.routes.ts
import { Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

export const routes: Routes = [
  { path: 'course-list', component: CourseListComponent },
  { path: 'course-form', component: CourseFormComponent },
  { path: 'course-detail/:id', component: CourseDetailComponent },
  { path: '', redirectTo: '/course-list', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/course-list' } // Wildcard route for 404
];
