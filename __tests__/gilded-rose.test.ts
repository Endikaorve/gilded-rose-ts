import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  it('El nombre no debería verse afectado', function () {
    const gildedRose = new GildedRose([new Item('Ítem básico', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('Ítem básico');
  });

  xit('La calidad no debería ser nunca mayor a 50', function () {
    const gildedRose = new GildedRose([new Item('Ítem básico', 10, 55)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it('Item básico: los días y calidad se degradan de 1 en 1', function () {
    const gildedRose = new GildedRose([new Item('Ítem básico', 10, 20)]);
    const days = 8;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(12);
  });

  it('Item básico: una vez se pasa la fecha de venta, la calidad se degrada al doble de velocidad', function () {
    const gildedRose = new GildedRose([new Item('Ítem básico', 10, 20)]);
    const days = 11;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(8);
  });

  it('Item básico: la calidad nunca es negativa', function () {
    const gildedRose = new GildedRose([new Item('Ítem básico', 10, 10)]);
    const days = 11;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(0);
  });

  it('Queso Brie envejecido: incrementa en 1 la calidad conforme pasan los días', function () {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
    const days = 8;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(28);
  });

  it('Queso Brie envejecido: una vez se pasa la fecha de venta, la calidad aumenta al doble de velocidad', function () {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
    const days = 11;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(32);
  });

  it('Cualquier item: su calidad nunca debería sobrepasar 50', function () {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 45)]);
    const days = 6;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(50);
  });

  it('Sulfuras: su fecha nunca cambia', function () {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 10, 45),
    ]);
    const days = 6;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].sellIn).toEqual(10);
  });

  it('Sulfuras: su calidad nunca cambia', function () {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 10, 45),
    ]);
    const days = 6;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(45);
  });

  it('Backstage: si faltan 10 días o menos para el concierto, la calidad se incrementa en 2 unidades', function () {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
    ]);
    const days = 2;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(24);
  });

  it('Backstage: si faltan 5 días o menos para el concierto, la calidad se incrementa en 2 unidades', function () {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
    ]);
    const days = 2;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(26);
  });

  it('Backstage: luego de la fecha de venta la calidad cae a 0', function () {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
    ]);
    const days = 6;

    let items = [];
    for (let index = 0; index < days; index++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(0);
  });
});
