export class Project {
  title: string;
  role: string;
  logo: string;
  description: string;
  keyResponsibilities: string[];
  note: string;
  videos: string[];
  images: string[];
  link: string;
  build: string;
  sourceCode: string;

  constructor(
    title: string,
    role: string,
    logo: string,
    description: string = '',
    keyResponsibilities: string[] = [],
    note: string = '',
    videos: string[] = [],
    images: string[] = [],
    link: string = '',
    build: string = '',
    sourceCode: string = '',
  ) {
    this.title = title;
    this.role = role;
    this.logo = logo;
    this.description = description;
    this.keyResponsibilities = keyResponsibilities;
    this.note = note;
    this.videos = videos;
    this.images = images;
    this.link = link;
    this.build = build;
    this.sourceCode = sourceCode;
  }
}
