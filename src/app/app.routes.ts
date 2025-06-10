import { Routes } from '@angular/router';

import { Projects } from './projects/projects';
import { Contact } from './contact/contact';
import { About } from './about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  } /* Redirect to about page if no directory specified */,
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
];
