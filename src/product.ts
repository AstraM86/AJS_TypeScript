export interface Product {
  id: number;
  name: string;
  price: number;
  isUnique: boolean; // true – только один экземпляр в корзине, false – можно несколько
}
