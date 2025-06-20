export class Project {
  title: string;
  logo: string;
  description: string;
  keyResponsibilities: string[];
  note: string;
  videos: string[];
  images: string[];

  constructor(
    title: string,
    logo: string,
    description: string = '',
    keyResponsibilities: string[] = [],
    note: string = '',
    videos: string[] = [],
    images: string[] = []
  ) {
    this.title = title;
    this.logo = logo;
    this.description = description;
    this.keyResponsibilities = keyResponsibilities;
    this.note = note;
    this.videos = videos;
    this.images = images;
  }
}
