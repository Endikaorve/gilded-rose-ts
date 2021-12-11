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
      if (!this.itemIsAgedBrie(item) && !this.itemIsBackstage(item)) {
        if (item.quality > 0) {
          if (!this.itemIsSulfuras(item)) {
            this.setNewQuality(item, -1);
          }
        }
      } else {
        if (this.itemQualityIsLessThan50(item)) {
          this.setNewQuality(item, 1);
          if (this.itemIsBackstage(item)) {
            if (item.sellIn < 11) {
              if (this.itemQualityIsLessThan50(item)) {
                this.setNewQuality(item, 1);
              }
            }
            if (item.sellIn < 6) {
              if (this.itemQualityIsLessThan50(item)) {
                this.setNewQuality(item, 1);
              }
            }
          }
        }
      }
      if (!this.itemIsSulfuras(item)) {
        this.setNewSellIn(item, -1);
      }
      if (item.sellIn < 0) {
        if (!this.itemIsAgedBrie(item)) {
          if (!this.itemIsBackstage(item)) {
            if (item.quality > 0) {
              if (!this.itemIsSulfuras(item)) {
                this.setNewQuality(item, -1);
              }
            }
          } else {
            this.setNewQuality(item, -item.quality);
          }
        } else {
          if (this.itemQualityIsLessThan50(item)) {
            this.setNewQuality(item, 1);
          }
        }
      }
    });

    return this.items;
  }

  private itemIsSulfuras(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private itemIsBackstage(item: Item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private itemIsAgedBrie(item: Item) {
    return item.name === 'Aged Brie';
  }

  private itemQualityIsLessThan50(item: Item) {
    return item.quality < 50;
  }

  private setNewQuality(item: Item, quality: number) {
    item.quality = item.quality + quality;
    return item;
  }

  private setNewSellIn(item: Item, sellIn: number) {
    item.sellIn = item.sellIn + sellIn;
    return item;
  }
}
