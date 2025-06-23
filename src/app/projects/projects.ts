import { Component } from '@angular/core';
import { Project } from '../models/project';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../models/projects';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = [];

  ngOnInit() {
    this.projects = PROJECTS;
  }
}
