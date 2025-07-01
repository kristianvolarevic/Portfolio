import { Routes } from '@angular/router';

import { Projects } from './projects/projects';
import { ContactComponent } from './contact/contact';
import { About } from './about/about';
import { Project } from './project/project';
import { Error404 } from './error404/error404';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  } /* Redirect to about page if no directory specified */,
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: ContactComponent },
  { path: 'projects/:id', component: Project },

  /* Must be the last route */
  { path: '**', component: Error404 },
];
