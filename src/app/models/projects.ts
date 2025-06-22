import { Project } from './project';

export const PROJECTS = [
  new Project(
    'Bite Nite',
    'Project Manager & Developer',
    '/img/bitenite-logo.jpg',
    '<strong>Bite Nite</strong> is a prototype game develped during my university course where I learnt alot about working within unreal engine and using c++ to create gameplay mechanics, a link to this project can be found <a href="https://kvol0002.itch.io/bitenite" target="_blank">here</a>.',
    [
      'Managing group progress and keeping members up to pace.',
      'Coding core gameplay mechanics in C++ and integrating them within UE5.',
      'Utilising version control (Git) to store source code and collaborate with team members',
      'Conducting playtests to receive feedback in order to better optimise the game.',
      'Implementing enemy AI to provide the player with a challenge, immersing them in the gameplay.',
    ],
    '', //empty note
    ['https://www.youtube.com/embed/4EK8Z5IJFYs?si=qtjAChc6Ee0N-7xN'],
    ['/img/bitenite1.jpg']
  ),
  new Project(
    '3D Character Assignment',
    '3D Character Artist',
    '/img/3dCharacterAssignment-logo.jpg',
    'This 3D character was made as part of a university assignment where I was tasked with designing and creating a character with accompanying accessories. The theme I went for was a medieval knight crossed with the devil, to convey this I added armour and a sword along with horns and wings. Additionally, this character was rigged and posed to convey a chosen character trail, the one I went for was a frightening and confident stance. ',
    [
      'Collating reference images & creating initial sketches.',
      'Modifying character base & skulpting details.',
      'Modeling character accessories.',
      'Rigging character with joins and controls.',
      'Posing character & exporting into unity.',
    ],
    '', //empty note
    []
  ),
];
