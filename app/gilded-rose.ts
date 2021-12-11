export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item: Item) => {
      if (this.itemIsSulfuras(item)) {
        this.updateSulfuras(item);
      } else if (this.itemIsAgedBrie(item)) {
        this.updateAgedBrie(item);
      } else if (this.itemIsBackstage(item)) {
        this.updateBackstage(item);
      } else {
        this.updateBasic(item);
      }
    });

    return this.items;
  }

  // Funciones de mapeo

  private updateSulfuras(item: Item) {}

  private updateAgedBrie(item: Item) {
    this.setNewSellIn(item, -1);
    if (this.checkItemSellIn(item, '<', 0)) {
      this.setNewQuality(item, 2);
    } else {
      this.setNewQuality(item, 1);
    }
  }

  private updateBackstage(item: Item) {
    this.setNewSellIn(item, -1);

    if (this.checkItemSellIn(item, '<', 0)) {
      this.setNewQuality(item, -item.quality);
    } else if (this.checkItemSellIn(item, '<=', 5)) {
      this.setNewQuality(item, 3);
    } else if (
      this.checkItemSellIn(item, '>', 5) &&
      this.checkItemSellIn(item, '<=', 10)
    ) {
      this.setNewQuality(item, 2);
    } else {
      this.setNewQuality(item, 1);
    }
  }

  private updateBasic(item: Item) {
    this.setNewSellIn(item, -1);

    if (this.checkItemSellIn(item, '<', 0)) {
      this.setNewQuality(item, -2);
    } else {
      this.setNewQuality(item, -1);
    }
  }

  // Funciones de utilidad

  private itemIsSulfuras(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private itemIsBackstage(item: Item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private itemIsAgedBrie(item: Item) {
    return item.name === 'Aged Brie';
  }

  private checkItemSellIn(
    item: Item,
    operator: '>' | '<' | '<=' | '>=',
    sellIn: number
  ) {
    if (operator === '<') return item.sellIn < sellIn;
    if (operator === '>') return item.sellIn > sellIn;
    if (operator === '<=') return item.sellIn <= sellIn;
    if (operator === '>=') return item.sellIn >= sellIn;
  }

  private checkItemQuality(
    item: Item,
    operator: '>' | '<' | '<=' | '>=',
    quality: number
  ) {
    if (operator === '<') return item.quality < quality;
    if (operator === '>') return item.quality > quality;
    if (operator === '<=') return item.quality <= quality;
    if (operator === '>=') return item.quality >= quality;
  }

  private setNewQuality(item: Item, quality: number) {
    item.quality = item.quality + quality;
    if (item.quality > 50) item.quality = 50;
    if (item.quality < 0) item.quality = 0;
  }

  private setNewSellIn(item: Item, sellIn: number) {
    item.sellIn = item.sellIn + sellIn;
  }
}
