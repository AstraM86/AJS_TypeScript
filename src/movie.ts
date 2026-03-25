import { Product } from './product';

export class Movie implements Product {
  isUnique = true;

  constructor(
    public id: number,
    public name: string,
    public director: string,
    public year: number,
    public genre: string,
    public price: number,
  ) {}
}
