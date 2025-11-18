import { Project } from './project';

export const PROJECTS = [
  // ------------------------
  // Chronorevert
  // ------------------------
  new Project(
    'ChronoRevert',
    'Project Manager & Developer',
    'img/chronoRevert-logo.jpg',
    "<strong>ChronoRevert</strong> is a first-person, 3D puzzle-platformer developed in Unreal Engine, set in a post-apocalyptic future shaped by humanity's fears of the future, technology, and the environment. The game explores the relationship between humans, climate, and machines, inviting players to uncover how our actions shape our world.",
    [
      'Managing group progress and keeping members up to pace.',
      'Coding core gameplay mechanics in C++ and integrating them within UE5.',
      'Utilising version control (Git) to store source code and collaborate with team members.',
      'Conducting playtests to receive feedback in order to better optimise the game.',
      'Implementing enemy AI to provide the player with a challenge, immersing them in the gameplay.',
      'Modelling and texturing various 3D assets.',
      'Recording Foley: footsteps, light switch, and keyboard typing.',
    ],
    '',
    ['https://www.youtube.com/embed/mj6WtYHFjCU?si=vgpui1kdNY8yHvlk'],
    [
      'img/chronoRevert1.jpg',
      'img/chronoRevert2.jpg',
      'img/chronoRevert3.jpg',
      'img/chronoRevert4.jpg',
      'img/chronoRevert5.jpg',
      'img/chronoRevert6.jpg',
    ],
    'https://luisa20891.itch.io/chronorevert'
  ),

  // ------------------------
  // Bite Nite
  // ------------------------
  new Project(
    'Bite Nite',
    'Project Manager & Developer',
    'img/bitenite-logo.jpg',
    '<strong>Bite Nite</strong> is a prototype game developed during my university course where I learnt a lot about working within Unreal Engine and using C++ to create gameplay mechanics.',
    [
      'Managing group progress and keeping members up to pace.',
      'Coding core gameplay mechanics in C++ and integrating them within UE5.',
      'Utilising version control (Git) to store source code and collaborate with team members.',
      'Conducting playtests to receive feedback in order to better optimise the game.',
      'Implementing enemy AI to provide the player with a challenge, immersing them in the gameplay.',
    ],
    '',
    ['https://www.youtube.com/embed/4EK8Z5IJFYs?si=qtjAChc6Ee0N-7xN'],
    ['img/bitenite1.jpg'],
    'https://kvol0002.itch.io/bitenite'
  ),

  // ------------------------
  // 3D Character Assignment
  // ------------------------
  new Project(
    '3D Character Assignment',
    '3D Character Artist',
    'img/3dCharacterAssignment-logo.jpg',
    'This 3D character was created as part of a university assignment where I was tasked with designing and creating a humanoid character with accompanying accessories. The theme I chose was a medieval knight crossed with a devil. To convey this, I added armour and a sword, along with horns and wings. Additionally, this character was rigged and posed to reflect a chosen character trait — in this case, a frightening and confident stance.',
    [
      'Collating reference images and creating initial sketches.',
      'Modifying the character base and sculpting details.',
      'Modelling character accessories.',
      'Rigging the character with joints and controls.',
      'Posing the character and exporting into Unity.',
    ],
    '',
    [],
    [],
    '',
    'builds/3D Character/index.html'
  ),

  // ------------------------
  // 3D Creature Assignment
  // ------------------------
  new Project(
    '3D Creature Assignment',
    '3D Artist',
    'img/3dCreatureAssignment-logo.jpg',
    'This 3D creature was created as part of a university assignment where I was tasked with designing and building a fictional creature. The concept was a velociraptor mixed with elements from other animals found in reference images. I also textured the creature and placed it on a stage within Unity.',
    [
      'Collating reference images and creating initial sketches.',
      'Creating the character base and adding detail.',
      'Creating a UV map and texturing the character.',
    ],
    '',
    [],
    [],
    '',
    'builds/3DCreature/index.html'
  ),

  // ------------------------
  // AR Assignment
  // ------------------------
  new Project(
    'Augmented Reality Assignment',
    '3D Modeller & AR Implementer',
    'img/arAssignment-logo.jpg',
    'During my university course, I undertook a unit covering Augmented and Virtual Reality. In this unit, I was responsible for creating virtual environments as immersive experiences for users. One such example can be seen in the assignment showcased in <a href="https://youtube.com/shorts/xaA6MZCtu_g" target="_blank">this</a> video. This project was built for Android devices and designed to run on a camera-enabled device.',
    [
      'Designing an immersive and visually appealing environment.',
      'Modelling and texturing 3D assets.',
      'Importing assets into Unity.',
      'Setting up AR functionality using provided libraries and tools.',
    ],
    '',
    ['https://youtube.com/embed/xaA6MZCtu_g'],
    ['img/arAssignment1.jpg', 'img/arAssignment2.jpg'],
    'https://drive.google.com/file/d/1dnoHra4Ohclh5WiqP1uGJP1uWb5pCNNe/view?usp=sharing'
  ),
];
