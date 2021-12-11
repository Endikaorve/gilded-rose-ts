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
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != 'Aged Brie' &&
        !this.itemIsBackstage(this.items[i])
      ) {
        if (this.items[i].quality > 0) {
          if (!this.itemIsSulfuras(this.items[i])) {
            this.setNewQuality(this.items[i], -1);
          }
        }
      } else {
        if (this.itemQualityIsLessThan50(this.items[i])) {
          this.setNewQuality(this.items[i], 1);
          if (this.itemIsBackstage(this.items[i])) {
            if (this.items[i].sellIn < 11) {
              if (this.itemQualityIsLessThan50(this.items[i])) {
                this.setNewQuality(this.items[i], 1);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.itemQualityIsLessThan50(this.items[i])) {
                this.setNewQuality(this.items[i], 1);
              }
            }
          }
        }
      }
      if (!this.itemIsSulfuras(this.items[i])) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (!this.itemIsBackstage(this.items[i])) {
            if (this.items[i].quality > 0) {
              if (!this.itemIsSulfuras(this.items[i])) {
                this.setNewQuality(this.items[i], -1);
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.itemQualityIsLessThan50(this.items[i])) {
            this.setNewQuality(this.items[i], 1);
          }
        }
      }
    }

    return this.items;
  }

  private itemIsSulfuras(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private itemIsBackstage(item: Item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private itemQualityIsLessThan50(item: Item) {
    return item.quality < 50;
  }

  private setNewQuality(item: Item, quality: number) {
    item.quality = item.quality + quality;
    return item;
  }
}
