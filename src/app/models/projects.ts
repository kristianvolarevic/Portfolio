import { Project } from './project';

export const PROJECTS = [
  new Project(
    'Bite Nite',
    '/img/bitenite-logo.jpg',
    '<strong>Bite Nite</strong> is a prototype game develped during my university course where I learnt alot about working within unreal engine and using c++ to create functionality, a link to this project can be found <a href="#">here</a>.',
    [
      'Managing group progress and keeping members up to pace.',
      'Coding core gameplay mechanics within c++ and integrating them within UE5.',
    ],
    'testing to see if note appears'
  ),
  new Project('3D Character Assignment', '/img/3dCharacterAssignment-logo.jpg'),
];
