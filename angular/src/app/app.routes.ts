import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async() => (await import("./pages/home/home.component")).HomeComponent,
    title:"Home Page",
  },
  {
    path: '**',
    loadComponent: async() => (await import("./pages/not-found/not-found.component")).NotFoundComponent
  },
];
