import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  add(product: Product, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error('Количество должно быть положительным');
    }

    const existingIndex = this.items.findIndex((item) => item.product.id === product.id);

    if (product.isUnique) {
      if (existingIndex !== -1) {
        return;
      }
      this.items.push({ product, quantity: 1 });
    } else if (existingIndex !== -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  remove(productId: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) {
      throw new Error(`Товар с id ${productId} не найден`);
    }
    this.items.splice(index, 1);
  }

  decreaseQuantity(productId: number, amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('Количество для уменьшения должно быть положительным');
    }

    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) {
      throw new Error(`Товар с id ${productId} не найден`);
    }

    const item = this.items[index];
    if (item.product.isUnique) {
      this.remove(productId);
    } else if (amount >= item.quantity) {
      this.remove(productId);
    } else {
      item.quantity -= amount;
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotalPrice(): number {
    return this.items.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0,
    );
  }

  getTotalPriceWithDiscount(discountPercent: number): number {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Скидка должна быть от 0 до 100');
    }
    const total = this.getTotalPrice();
    const discount = total * (discountPercent / 100);
    return total - discount;
  }
}
