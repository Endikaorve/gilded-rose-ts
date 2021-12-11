import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  it('El nombre no debería verse afectado', function () {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('foo');
  });
});
