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
    this.initialiseSkillsAndTools();
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
    const bachelorOfITMajor: Item = new Item('Major: Games & Immersive Media');
    const bachelorOfITMinors: Item = new Item(
      'Minors: Mobile Apps Development & Software Engineering'
    );

    //Add SubItems
    bachelorOfIT.subItems.push(bachelorOfITMajor);
    bachelorOfIT.subItems.push(bachelorOfITMinors);

    //Add Items
    qualifications.items.push(bachelorOfIT);

    //Store Section
    this.sections.push(qualifications);
  }

  initialiseSkillsAndTools() {
    const SkillsAndTools: Section = new Section('Skills & Tools', []);

    //Create Items
    const HardSkills: Item = new Item('Hard Skills');
    const SoftSkills: Item = new Item('Soft Skills');
    const Tools: Item = new Item('Tools');

    //Create Sub Items
    //-----Hard Skills
    const programming: Item = new Item(
      'Programming (C++, C#, JavaScript, Python & Java)'
    );
    const modelling: Item = new Item('3D Modelling & Texturing');
    const soundDesign: Item = new Item('Sound Design');
    const versionControl: Item = new Item('Version Control');
    const mathsAndPhysics: Item = new Item(
      'Mathematics & Physics (High School Level)'
    );
    const mobileApps: Item = new Item(
      'Mobile Application Development (Android)'
    );
    const web: Item = new Item('Web Development (HTML, JavaScript & CSS)');
    const databaseManagement: Item = new Item(
      'Database Management (Relational & NoSQL)'
    );

    //-----Soft Skills
    const problemSolving: Item = new Item('Creative Problem Solving');
    const team: Item = new Item('Team Collaboration');
    const communication: Item = new Item('Clear & Concise Communication');
    const adaptability: Item = new Item('Adaptability');
    const timeMangement: Item = new Item('Time Management');
    const attentionToDetail: Item = new Item('Attention To Detail');

    //-----Tools
    const UE5: Item = new Item('Unreal Engine 5 (UE5)');
    const Unity: Item = new Item('Unity');
    const Maya: Item = new Item('Autodesk Maya');
    const VSCode: Item = new Item('Visual Studio Code');
    const Rider: Item = new Item('JetBrains Rider');
    const Git: Item = new Item('Git (GitHub & GitLab)');
    const SubstancePainter: Item = new Item('Substance 3D Painter');
    const Microsoft: Item = new Item('Microsoft Suite');
    const Google: Item = new Item('Google Suite');
    const FMod: Item = new Item('FMOD Studio');

    //Add Sub Items
    HardSkills.subItems.push(programming);
    HardSkills.subItems.push(modelling);
    HardSkills.subItems.push(soundDesign);
    HardSkills.subItems.push(versionControl);
    HardSkills.subItems.push(mathsAndPhysics);
    HardSkills.subItems.push(mobileApps);
    HardSkills.subItems.push(web);
    HardSkills.subItems.push(databaseManagement);

    SoftSkills.subItems.push(problemSolving);
    SoftSkills.subItems.push(team);
    SoftSkills.subItems.push(communication);
    SoftSkills.subItems.push(adaptability);
    SoftSkills.subItems.push(timeMangement);
    SoftSkills.subItems.push(attentionToDetail);

    Tools.subItems.push(UE5);
    Tools.subItems.push(Unity);
    Tools.subItems.push(Maya);
    Tools.subItems.push(VSCode);
    Tools.subItems.push(Rider);
    Tools.subItems.push(Git);
    Tools.subItems.push(SubstancePainter);
    Tools.subItems.push(Microsoft);
    Tools.subItems.push(Google);
    Tools.subItems.push(FMod);

    //Add Items
    SkillsAndTools.items.push(HardSkills);
    SkillsAndTools.items.push(SoftSkills);
    SkillsAndTools.items.push(Tools);

    //Store Section
    this.sections.push(SkillsAndTools);
  }

  toggleSection(section: any) {
    section.expanded = !section.expanded;
  }
}
