import { Product } from './product';

export class AudioAlbum implements Product {
  isUnique = true;

  constructor(
    public id: number,
    public name: string,
    public artist: string,
    public price: number
  ) {}
}
