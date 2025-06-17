import { Component } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects: Project[] = [];

  ngOnInit() {
    this.initialiseProjects();
  }

  initialiseProjects() {
    //Create projects
    const biteNite = new Project('Bite Nite', '/img/bitenite-logo.jpg');
    const characterAssignment3D = new Project(
      '3D Character Assignment',
      '/img/3dCharacterAssignment-logo.jpg'
    );

    //Add projects to list
    this.projects.push(biteNite);
    this.projects.push(characterAssignment3D);
  }
}
