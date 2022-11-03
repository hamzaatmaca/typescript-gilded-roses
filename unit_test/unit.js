import Gilded_Rose, {
  Items_Enum,
  max_staffquality,
  min_staffquality,
  normal_item_2_days,
  item_3_days,
  item_2_days,
} from "../src";

describe("#unit", () => {
  describe("refresh_quality", () => {
    describe("kalite max değerden büyükse", () => {
      it("maks değer için kalite", () => {
        const initialState = [
          {
            name: Items_Enum.aged_brie,
            sell_in: -1,
            staff_quality: max_staffquality + 10,
          },
        ];
        const response = [
          {
            name: Items_Enum.aged_brie,
            staff_quality: max_staffquality,
          },
        ];

        const gilded_rose = new Gilded_Rose(initialState);

        gilded_rose.refresh_quality();

        expect(gilded_rose.items).toMatchObject(response);
      });
    });

    describe("x_item için değer", () => {
      describe(" sell_in, ikişer artacak günlerden daha az veya buna eşit durumda ise", () => {
        it("kaliteyi iki azalat", () => {
          const initialState = [
            {
              name: Items_Enum.aged_brie,
              sell_in: normal_item_2_days,
              staff_quality: 10,
            },
          ];
          const response = [
            {
              name: Items_Enum.aged_brie,
              staff_quality: 12,
            },
          ];

          const gilded_rose = new Gilded_Rose(initialState);

          gilded_rose.refresh_quality();

          expect(gilded_rose.items).toMatchObject(response);
        });
      });

      describe("sell_in, ikişer artacak günlerden daha fazla durumda ise", () => {
        it("kaliteyi artır", () => {
          const initialState = [
            {
              name: Items_Enum.aged_brie,
              sell_in: normal_item_2_days + 1,
              staff_quality: 10,
            },
          ];
          const response = [
            {
              name: Items_Enum.aged_brie,
              staff_quality: 11,
            },
          ];

          const gilded_rose = new Gilded_Rose(initialState);

          gilded_rose.refresh_quality();

          expect(gilded_rose.items).toMatchObject(response);
        });
      });

      it("sell_in değerini azalt", () => {
        const initialState = [
          {
            name: Items_Enum.aged_brie,
            sell_in: 2,
            staff_quality: 10,
          },
        ];
        const response = [
          {
            name: Items_Enum.aged_brie,
            sell_in: 1,
          },
        ];

        const gilded_rose = new Gilded_Rose(initialState);

        gilded_rose.refresh_quality();

        expect(gilded_rose.items).toMatchObject(response);
      });
    });

    describe("xx_item için değer", () => {
      describe("item backstage_passes değilse", () => {
        describe("sell_in, 3 er artacak günlerden daha az veya buna eşit durumda ise", () => {
          it("kaliteyi 3 artır", () => {
            const initialState = [
              {
                name: Items_Enum.backstage_passes,
                sell_in: item_3_days,
                staff_quality: 10,
              },
            ];
            const response = [
              {
                name: Items_Enum.backstage_passes,
                staff_quality: 13,
              },
            ];

            const gilded_rose = new Gilded_Rose(initialState);

            gilded_rose.refresh_quality();

            expect(gilded_rose.items).toMatchObject(response);
          });
        });

        describe("and the sell in is less or equals than days to increase two times", () => {
          it("kaliteyi 2 artır", () => {
            const initialState = [
              {
                name: Items_Enum.backstage_passes,
                sell_in: item_2_days,
                staff_quality: 10,
              },
            ];
            const response = [
              {
                name: Items_Enum.backstage_passes,
                staff_quality: 12,
              },
            ];

            const gilded_rose = new Gilded_Rose(initialState);

            gilded_rose.refresh_quality();

            expect(gilded_rose.items).toMatchObject(response);
          });
        });

        describe("sell_in, 3 er artacak günlerden daha fazla durumda ise", () => {
          it("kaliteyi artır", () => {
            const initialState = [
              {
                name: Items_Enum.aged_brie,
                sell_in: item_3_days + 1,
                staff_quality: 10,
              },
            ];
            const response = [
              {
                name: Items_Enum.aged_brie,
                staff_quality: 11,
              },
            ];

            const gilded_rose = new Gilded_Rose(initialState);

            gilded_rose.refresh_quality();

            expect(gilded_rose.items).toMatchObject(response);
          });
        });
      });

      describe("item backstage_passes ise", () => {
        describe("sell_in değeri negatif", () => {
          it("kaliteyi sıfırla", () => {
            const initialState = [
              {
                name: Items_Enum.backstage_passes,
                sell_in: -1,
                staff_quality: 10,
              },
            ];
            const response = [
              {
                name: Items_Enum.backstage_passes,
                staff_quality: 0,
              },
            ];

            const gilded_rose = new Gilded_Rose(initialState);

            gilded_rose.refresh_quality();

            expect(gilded_rose.items).toMatchObject(response);
          });
        });
      });

      it("sell_in değerini azalt", () => {
        const initialState = [
          {
            name: Items_Enum.aged_brie,
            sell_in: 2,
            staff_quality: 10,
          },
        ];
        const response = [
          {
            name: Items_Enum.aged_brie,
            sell_in: 1,
          },
        ];

        const gilded_rose = new Gilded_Rose(initialState);

        gilded_rose.refresh_quality();

        expect(gilded_rose.items).toMatchObject(response);
      });
    });

    describe("xxx_item için değer", () => {
      it("değer değişimi yok", () => {
        const initialState = [
          {
            name: Items_Enum.sulfur,
            sell_in: 0,
            staff_quality: 80,
          },
        ];

        const gilded_rose = new Gilded_Rose(initialState);

        gilded_rose.refresh_quality();

        expect(gilded_rose.items).toMatchObject(initialState);
      });
    });

    describe("conjured item için değer", () => {
      it("kaliteyi ikşer azalt", () => {
        const initialState = [
          {
            name: Items_Enum.conjured,
            sell_in: 0,
            staff_quality: 2,
          },
        ];
        const response = [
          {
            name: Items_Enum.conjured,
            staff_quality: 0,
          },
        ];

        const gilded_rose = new Gilded_Rose(initialState);

        gilded_rose.refresh_quality();

        expect(gilded_rose.items).toMatchObject(response);
      });

      it("decreases the sell in", () => {
        const initialState = [
          {
            name: Items_Enum.conjured,
            sell_in: 0,
            staff_quality: 10,
          },
        ];
        const response = [
          {
            name: Items_Enum.conjured,
            sell_in: -1,
          },
        ];

        const gilded_rose = new Gilded_Rose(initialState);

        gilded_rose.refresh_quality();

        expect(gilded_rose.items).toMatchObject(response);
      });
    });
  });
});
