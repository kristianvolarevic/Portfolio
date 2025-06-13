import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  sections = [
    {
      title: 'Work History',
      expanded: false,
      items: ['Crew Member at Guzman y Gomez Burnside (2023-2025)'],
    },
    {
      title: 'Qualifications',
      expanded: false,
      items: [
        "Bachelor's Degree of Information Technology, Monash University (2025)",
      ],
    },
    {
      title: 'Skills & Tools',
      expanded: false,
      items: ['Test1'],
    },
  ];

  toggleSection(section: any) {
    section.expanded = !section.expanded;
  }
}
