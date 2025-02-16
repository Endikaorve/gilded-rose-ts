export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item: Item) => {
      if (this.itemIsSulfuras(item)) {
        this.updateSulfurasItem(item);
      } else if (this.itemIsAgedBrie(item)) {
        this.updateAgedBrieItem(item);
      } else if (this.itemIsBackstage(item)) {
        this.updateBackstageItem(item);
      } else {
        this.updateBasicItem(item);
      }
    });

    return this.items;
  }

  // Funciones de clasificación de items

  private itemIsSulfuras(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private itemIsBackstage(item: Item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private itemIsAgedBrie(item: Item) {
    return item.name === 'Aged Brie';
  }

  private itemIsConjured(item: Item) {
    return item.name.toLowerCase().includes('conjured');
  }

  // Funciones de mapeo

  private updateSulfurasItem(item: Item) {}

  private updateAgedBrieItem(item: Item) {
    this.setNewSellIn(item, -1);
    if (this.checkItemSellIn(item, '<', 0)) {
      this.setNewQuality(item, 2);
    } else {
      this.setNewQuality(item, 1);
    }
  }

  private updateBackstageItem(item: Item) {
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

  private updateBasicItem(item: Item) {
    const conjuredMultiplier: number = this.itemIsConjured(item) ? 2 : 1;
    this.setNewSellIn(item, -1);

    if (this.checkItemSellIn(item, '<', 0)) {
      this.setNewQuality(item, -2 * conjuredMultiplier);
    } else {
      this.setNewQuality(item, -1 * conjuredMultiplier);
    }
  }

  // Funciones de utilidad

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

  private setNewQuality(item: Item, quality: number) {
    item.quality = item.quality + quality;
    if (item.quality > 50) item.quality = 50;
    if (item.quality < 0) item.quality = 0;
  }

  private setNewSellIn(item: Item, sellIn: number) {
    item.sellIn = item.sellIn + sellIn;
  }
}
