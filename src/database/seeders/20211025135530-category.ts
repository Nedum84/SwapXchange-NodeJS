"use strict";

import { QueryInterface } from "sequelize";

export default {
  up: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkInsert(
      "Category",
      [
        {
          category_id: "o67pbTLMMT5c",
          category_name: "Phones and Tablets",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637426615427?alt=media&token=d463de84-619d-47f8-946a-6dcb7f770f04",
          idx: 200,
        },
        {
          category_id: "hGA9m8zAXmCo",
          category_name: "Electronics",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637426678628?alt=media&token=b695e83d-9c71-4e24-8bee-e3bc275e5d24",
          idx: 200,
        },
        {
          category_id: "9MQ7aAP2iqJi",
          category_name: "Fashion",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637427922499?alt=media&token=2b13f3bc-27ce-460d-a793-0688ec956b4d",
          idx: 200,
        },
        {
          category_id: "j9pVxA2WpHvX",
          category_name: "Computers",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637427955301?alt=media&token=4b22e613-6567-435a-b44e-4f4278cfd4ed",
          idx: 200,
        },
        {
          category_id: "15gzQj3yeAjZ",
          category_name: "Gaming",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637427977903?alt=media&token=726ea8e7-edf4-478a-96ba-a5ed4c80dbc2",
          idx: 200,
        },
        {
          category_id: "2vok2L7ysXpJ",
          category_name: "Agriculture",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637427999024?alt=media&token=ed9e1499-5467-42ad-9fd8-318557d2e96c",
          idx: 200,
        },
        {
          category_id: "FCzoWfyupkiH",
          category_name: "Sports",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637428014625?alt=media&token=d8f7bdc3-4802-40f8-8478-f183219f9ec4",
          idx: 200,
        },
        {
          category_id: "zTkFjDAJ6vqX",
          category_name: "Automobiles",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637428033641?alt=media&token=9300fdfe-7c3e-4509-b855-f8205f634694",
          idx: 200,
        },
        {
          category_id: "Zo2qWWgTpdMK",
          category_name: "Toy & Pets",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637428052476?alt=media&token=ad56adad-a883-465d-8ad2-c6a10570eed2",
          idx: 200,
        },
        {
          category_id: "c1hfbSBdoSMd",
          category_name: "Health and Wellbeing",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637428113337?alt=media&token=6e6dd782-8e24-44ac-a90f-a50646df65e7",
          idx: 200,
        },
        {
          category_id: "WDHsYaBNz886",
          category_name: "Home and Office",
          category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/category%2F1637429742865?alt=media&token=93007cf1-b959-4de8-a8db-b7bd6c9d01c1",
          idx: 200,
        },
      ],
      {}
    );
  },

  down: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkDelete("Category", {}, {});
  },
};
