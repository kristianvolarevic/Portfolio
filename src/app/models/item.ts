export class Item {
  name: string;
  linkText: string;
  linkHref: string;
  nameCont: string;
  subItems: Item[];

  constructor(
    name: string,
    subItems: Item[] = [],
    linkText: string = '',
    linkHref: string = '',
    nameCont: string = ''
  ) {
    this.name = name;
    this.linkText = linkText;
    this.linkHref = linkHref;
    this.nameCont = nameCont;
    this.subItems = subItems;
  }
}
