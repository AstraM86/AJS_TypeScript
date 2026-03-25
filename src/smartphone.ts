import { Product } from './product';

export class Smartphone implements Product {
  isUnique = false;

  constructor(
    public id: number,
    public name: string,
    public brand: string,
    public price: number
  ) {}
}
