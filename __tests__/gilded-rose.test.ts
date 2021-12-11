import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  it('El nombre no debería verse afectado', function () {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('foo');
  });

  it('Item básico: los días y calidad se degradan de 1 en 1', function () {
    const gildedRose = new GildedRose([new Item('Test básico', 10, 20)]);
    const days = 8;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(12);
  });
});
