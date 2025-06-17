export class Project {
  title: string;
  logo: string;
  href: string;

  constructor(title: string, logo: string, href: string = '/contact') {
    this.title = title;
    this.logo = logo;
    this.href = href;
  }
}
