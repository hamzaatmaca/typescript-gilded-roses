export const min_staffquality = 0;
export const max_staffquality = 50;
export const normal_item_2_days = 0;
export const item_2_days = 10;
export const item_3_days = 5;

export enum Items_Enum {
  aged_brie = "aged brie",
  sulfur = "sulfur",
  backstage_passes = "backstage passes ",
  conjured = "conjured ",
}

export const default_item_state: Item[] = [
  {
    name: Items_Enum.aged_brie,
    sell_in: 2,
    staff_quality: 0,
  },
  {
    name: Items_Enum.sulfur,
    sell_in: 0,
    staff_quality: 80,
  },
  {
    name: Items_Enum.backstage_passes,
    sell_in: 15,
    staff_quality: 20,
  },
  {
    name: Items_Enum.conjured,
    sell_in: 3,
    staff_quality: 6,
  },
];

class Item {
  name: string;
  sell_in: number;
  staff_quality: number;

  constructor(name: string, sell_in: number, staff_quality: number) {
    this.name = name;
    this.sell_in = sell_in;
    this.staff_quality = staff_quality;
  }
}

export default class Gilded_Rose {
  items: Item[];

  readonly x_rare_items: Items_Enum[] = [Items_Enum.aged_brie];
  readonly xx_rare_items: Items_Enum[] = [Items_Enum.backstage_passes];
  readonly xxx_rare_items: Items_Enum[] = [Items_Enum.sulfur];
  readonly conjured_items: Items_Enum[] = [Items_Enum.conjured];

  constructor(items = default_item_state) {
    this.items = items.map(
      ({ name, sell_in, staff_quality }) =>
        new Item(name, sell_in, staff_quality)
    );
  }

  decrease_item_sell(item_number: number) {
    this.items[item_number].sell_in -= 1;
  }

  decrease_quality(item_number: number, times: number = 1) {
    let value_of_quality = this.items[item_number].staff_quality - times;

    if (value_of_quality < min_staffquality) {
      value_of_quality = min_staffquality;
    }

    this.items[item_number].staff_quality = value_of_quality;
  }

  increase_quality(item_number: number, times: number = 1) {
    let value_of_quality = this.items[item_number].staff_quality + times;

    if (value_of_quality > max_staffquality) {
      value_of_quality = max_staffquality;
    }

    this.items[item_number].staff_quality = value_of_quality;
  }

  zero_quality(item_number: number) {
    this.items[item_number].staff_quality = 0;
  }

  negative_days_sell_item(item_number: number) {
    return this.items[item_number].sell_in <= 0;
  }

  backstage_passes_xx_item(item_number: number) {
    return this.items[item_number].name == Items_Enum.backstage_passes;
  }

  refresh_x_item_quality(item_number: number) {
    const sell_in = this.items[item_number].sell_in;

    if (sell_in <= normal_item_2_days) {
      this.increase_quality(item_number, 2);
    } else {
      this.increase_quality(item_number);
    }
  }

  refresh_xx_item_quality(item_number: number) {
    const sell_in = this.items[item_number].sell_in;

    if (sell_in <= item_3_days) {
      this.increase_quality(item_number, 3);
    } else if (sell_in <= item_2_days) {
      this.increase_quality(item_number, 2);
    } else {
      this.increase_quality(item_number);
    }
  }

  refresh_same_item_quality(item_number: number) {
    const sell_in = this.items[item_number].sell_in;

    if (sell_in <= 0) {
      this.decrease_quality(item_number, 2);
    } else {
      this.decrease_quality(item_number);
    }
  }

  refresh_conjured_item_quality(item_number: number) {
    this.decrease_quality(item_number, 2);
  }

  refresh_quality(): this {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const x_item = this.x_rare_items.includes(item.name as Items_Enum);
      const xx_item = this.xx_rare_items.includes(item.name as Items_Enum);
      const xxx_item = this.xxx_rare_items.includes(item.name as Items_Enum);
      const conjured_item = this.conjured_items.includes(
        item.name as Items_Enum
      );

      switch (true) {
        case x_item:
          this.refresh_x_item_quality(i);
          this.decrease_item_sell(i);

          break;

        case xx_item:
          if (
            this.backstage_passes_xx_item(i) &&
            this.negative_days_sell_item(i)
          ) {
            this.zero_quality(i);
          } else {
            this.refresh_xx_item_quality(i);
          }

          this.decrease_item_sell(i);

          break;

        case xxx_item:
          break;

        case conjured_item:
          this.refresh_conjured_item_quality(i);
          this.decrease_item_sell(i);

          break;

        default:
          this.refresh_same_item_quality(i);
          this.decrease_item_sell(i);
      }
    }
    return this;
  }
}
