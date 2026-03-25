import { Cart } from '../src/cart';
import { Book } from '../src/book';
import { AudioAlbum } from '../src/audio-album';
import { Movie } from '../src/movie';
import { Smartphone } from '../src/smartphone';
import { Laptop } from '../src/laptop';

describe('Cart', () => {
  let cart: Cart;
  let book: Book;
  let album: AudioAlbum;
  let movie: Movie;
  let phone: Smartphone;
  let laptop: Laptop;

  beforeEach(() => {
    cart = new Cart();
    book = new Book(1, 'Book Title', 'Author', 100);
    album = new AudioAlbum(2, 'Album Title', 'Artist', 200);
    movie = new Movie(3, 'Movie Title', 'Director', 2020, 'Drama', 300);
    phone = new Smartphone(4, 'iPhone 13', 'Apple', 800);
    laptop = new Laptop(5, 'XPS 15', 'Dell', 1500);
  });

  test('добавление уникальных товаров: повторное добавление не увеличивает количество', () => {
    cart.add(book);
    cart.add(book);
    cart.add(album);
    const items = cart.getItems();
    expect(items).toHaveLength(2);
    expect(items.find(i => i.product.id === 1)!.quantity).toBe(1);
    expect(items.find(i => i.product.id === 2)!.quantity).toBe(1);
  });

  test('добавление количественных товаров: увеличивает количество', () => {
    cart.add(phone, 2);
    cart.add(phone, 3);
    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(5);
  });

  test('добавление с нулевым или отрицательным количеством выбрасывает ошибку', () => {
    expect(() => cart.add(phone, 0)).toThrow('Количество должно быть положительным');
    expect(() => cart.add(phone, -5)).toThrow('Количество должно быть положительным');
  });

  test('удаление позиции по id', () => {
    cart.add(book);
    cart.add(phone);
    cart.remove(1);
    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe(4);
  });

  test('удаление несуществующего id выбрасывает ошибку', () => {
    cart.add(book);
    expect(() => cart.remove(999)).toThrow('Товар с id 999 не найден');
  });

  test('уменьшение количества для количественного товара', () => {
    cart.add(phone, 5);
    cart.decreaseQuantity(4, 2);
    let items = cart.getItems();
    expect(items[0].quantity).toBe(3);

    cart.decreaseQuantity(4, 3);
    items = cart.getItems();
    expect(items).toHaveLength(0);
  });

  test('уменьшение количества для уникального товара удаляет его', () => {
    cart.add(book);
    cart.decreaseQuantity(1);
    expect(cart.getItems()).toHaveLength(0);
  });

  test('уменьшение количества с неверным amount выбрасывает ошибку', () => {
    cart.add(phone);
    expect(() => cart.decreaseQuantity(4, 0)).toThrow('Количество для уменьшения должно быть положительным');
    expect(() => cart.decreaseQuantity(4, -1)).toThrow('Количество для уменьшения должно быть положительным');
  });

  test('уменьшение количества для несуществующего товара выбрасывает ошибку', () => {
    expect(() => cart.decreaseQuantity(999)).toThrow('Товар с id 999 не найден');
  });

  test('getTotalPrice возвращает общую стоимость с учётом количества', () => {
    cart.add(book); // 100
    cart.add(phone, 3); // 800 * 3 = 2400
    cart.add(laptop, 2); // 1500 * 2 = 3000
    expect(cart.getTotalPrice()).toBe(100 + 2400 + 3000);
  });

  test('getTotalPriceWithDiscount корректно применяет скидку', () => {
    cart.add(book);
    cart.add(phone, 2);
    const total = 100 + 1600;
    expect(cart.getTotalPriceWithDiscount(10)).toBe(total * 0.9);
    expect(cart.getTotalPriceWithDiscount(0)).toBe(total);
    expect(cart.getTotalPriceWithDiscount(100)).toBe(0);
  });

  test('getTotalPriceWithDiscount выбрасывает ошибку при неверной скидке', () => {
    cart.add(book);
    expect(() => cart.getTotalPriceWithDiscount(-5)).toThrow('Скидка должна быть от 0 до 100');
    expect(() => cart.getTotalPriceWithDiscount(150)).toThrow('Скидка должна быть от 0 до 100');
  });

  test('метод getItems возвращает копию массива', () => {
    cart.add(book);
    const items = cart.getItems();
    items.pop();
    expect(cart.getItems()).toHaveLength(1);
  });
});
