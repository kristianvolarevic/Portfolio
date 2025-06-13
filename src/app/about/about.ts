import { Component } from '@angular/core';
import { Section } from '../models/section';
import { Item } from '../models/item';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  sections: Section[] = [];

  ngOnInit() {
    this.initialiseWorkHistory();
    this.initialiseQualifications();
  }

  initialiseWorkHistory() {
    const workHistory: Section = new Section('Work History', []);

    //Create Items
    const GYG: Item = new Item(
      'Crew Member at ',
      [], //empty subitem
      'Guzman y Gomez Burnside',
      'https://www.guzmanygomez.com.au/locations/burnside/',
      ' (2023-2025)'
    );

    //Add items to section
    workHistory.items.push(GYG);

    //Store section
    this.sections.push(workHistory);
  }

  initialiseQualifications() {
    const qualifications: Section = new Section('Qualifications', []);

    //Create Items
    const bachelorOfIT: Item = new Item(
      "Bachelor's Degree of Information Technology, ",
      [],
      'Monash University',
      'https://www.monash.edu/',
      ' (Expected 2025)'
    );

    //Create SubItems
    const bachelorOfItMajor: Item = new Item('Major: Games & Immersive Media');

    //Add SubItems
    bachelorOfIT.subItems.push(bachelorOfItMajor);

    //Add Items
    qualifications.items.push(bachelorOfIT);

    //Store Section
    this.sections.push(qualifications);
  }

  toggleSection(section: any) {
    section.expanded = !section.expanded;
  }
}
