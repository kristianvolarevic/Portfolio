import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS } from '../models/projects';
import { Project as ProjectModel } from '../models/project';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css',
  encapsulation: ViewEncapsulation.None,
})
export class Project {
  projectTitle: String | null = null;
  project: ProjectModel | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectTitle = this.route.snapshot.paramMap.get('id');
    PROJECTS.forEach((element) => {
      if (element.title == this.projectTitle) {
        this.project = element;
      }
    });
  }
}
