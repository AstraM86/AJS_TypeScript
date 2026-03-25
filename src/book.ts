import { Product } from './product';

export class Book implements Product {
  isUnique = true; // электронная книга уникальна

  constructor(
    public id: number,
    public name: string,
    public author: string,
    public price: number
  ) {}
}
