import { Item } from './item';

export class Section {
  title: string;
  expanded: boolean;
  items: Item[];

  constructor(title: string, items: Item[], expanded: boolean = false) {
    this.title = title;
    this.expanded = expanded;
    this.items = items;
  }
}
