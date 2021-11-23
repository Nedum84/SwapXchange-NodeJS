"use strict";

import { QueryInterface } from "sequelize";

export default {
  up: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkInsert(
      "SubCategory",
      [
        {
          sub_category_id: "MZKU3GMKqrTQ",
          sub_category_name: "Smartphones",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428319346?alt=media&token=b8eba799-e8ee-4118-9b44-7a29e9b534c2",
          category_id: "o67pbTLMMT5c",
          idx: 200,
        },
        {
          sub_category_id: "Ny5qH8FurMY5",
          sub_category_name: "Tablets",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428343315?alt=media&token=142b06c8-cdfa-4177-8cf7-b38fe6bbc10d",
          category_id: "o67pbTLMMT5c",
          idx: 200,
        },
        {
          sub_category_id: "8aMj4c8uVY8K",
          sub_category_name: "Basic Phones",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428370698?alt=media&token=81d2456e-a19d-4f8d-aa44-a01439462bfc",
          category_id: "o67pbTLMMT5c",
          idx: 200,
        },
        {
          sub_category_id: "uDHMn5w5MBfz",
          sub_category_name: "Television",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428396536?alt=media&token=3c6e3951-6a03-43a8-b47c-57cf95f6fc96",
          category_id: "hGA9m8zAXmCo",
          idx: 200,
        },
        {
          sub_category_id: "dFfXkLwPyrHD",
          sub_category_name: "Radio",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428594781?alt=media&token=48fee2ff-9906-4f45-8161-2a0a25c6a018",
          category_id: "hGA9m8zAXmCo",
          idx: 200,
        },
        {
          sub_category_id: "Kd78mW4iRg7k",
          sub_category_name: "DVD",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428619413?alt=media&token=56ff63b1-673b-46b2-a94d-f528ee4d4aee",
          category_id: "hGA9m8zAXmCo",
          idx: 200,
        },
        {
          sub_category_id: "7A2h9kRFyfL5",
          sub_category_name: "Cameras",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428758899?alt=media&token=bb35aba4-6c8f-4b60-bc00-2a44b5a35cd3",
          category_id: "hGA9m8zAXmCo",
          idx: 200,
        },
        {
          sub_category_id: "qXnBY3voRsgm",
          sub_category_name: "Camcorders",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428785117?alt=media&token=32491d1a-0fb6-43de-9e25-9a4ebd3e22d4",
          category_id: "hGA9m8zAXmCo",
          idx: 200,
        },
        {
          sub_category_id: "w2QRxWg37NGM",
          sub_category_name: "Womens",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428813372?alt=media&token=603166f7-9606-4b37-8db2-dd6bfe1257af",
          category_id: "9MQ7aAP2iqJi",
          idx: 200,
        },
        {
          sub_category_id: "UmjAifdGzbUQ",
          sub_category_name: "Mens",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428829055?alt=media&token=672bde23-6060-4021-9c07-56b3f5020f69",
          category_id: "9MQ7aAP2iqJi",
          idx: 200,
        },
        {
          sub_category_id: "YGCMYgwkVSTM",
          sub_category_name: "Girls",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428850510?alt=media&token=15e7a981-5aea-4993-97b5-d5b8010decb3",
          category_id: "9MQ7aAP2iqJi",
          idx: 200,
        },
        {
          sub_category_id: "KZ3mKJ6QcpTL",
          sub_category_name: "Boys",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428871005?alt=media&token=169def4d-068b-468a-8825-cf9bda4706a4",
          category_id: "9MQ7aAP2iqJi",
          idx: 200,
        },
        {
          sub_category_id: "98XyRmq9UAKu",
          sub_category_name: "Baby’s",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428900976?alt=media&token=0b69b959-fde3-4743-926c-39f0f4a3eee0",
          category_id: "9MQ7aAP2iqJi",
          idx: 200,
        },
        {
          sub_category_id: "VCTaJRapumqk",
          sub_category_name: "Desktop",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428947665?alt=media&token=a80b8af3-339b-4ee2-9bd9-02fd79226bdb",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "kFrcxhfwwPUn",
          sub_category_name: "Laptop",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428971950?alt=media&token=256e8a4c-ab31-4868-ad50-d77291f38660",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "8YsRtqRVhYfA",
          sub_category_name: "Hard Drive",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637428991419?alt=media&token=f48eb985-a250-410f-a90b-6646645be1fa",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "YSBqJpUYejSk",
          sub_category_name: "Flash Drive",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429009098?alt=media&token=ccba81ba-2fbf-48d9-a905-a0911dab15e7",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "KSS9iiCD4gBg",
          sub_category_name: "External Drive",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429030167?alt=media&token=75b97f07-a200-48b6-9aeb-7d47ba3f9a2a",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "kCspgbtMYYUc",
          sub_category_name: "Printers",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429057585?alt=media&token=abaf5c61-7939-40ef-9c48-759bf19b6015",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "6atCCJVzJ9KB",
          sub_category_name: "Antivirus",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429076194?alt=media&token=baa8c74a-9f8e-4e21-888b-9d91b29f4d63",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "8jFRLcv8k1kD",
          sub_category_name: "Software",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429091962?alt=media&token=7fc8ae3f-8521-491e-a9e0-d04666d09907",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "bxg5g28eyt8w",
          sub_category_name: "Ink & Toner",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429114996?alt=media&token=972bc34b-3b49-4d49-b506-62ed5f646b21",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "iwAyQD6BFaRh",
          sub_category_name: "Projectors",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429139060?alt=media&token=e06902cc-1646-44f3-85a9-01fdb4feb1cd",
          category_id: "j9pVxA2WpHvX",
          idx: 200,
        },
        {
          sub_category_id: "L6WWNAusuXvR",
          sub_category_name: "Play Station",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429180582?alt=media&token=630597bf-a138-444c-b719-5d8c8ee24a3b",
          category_id: "15gzQj3yeAjZ",
          idx: 200,
        },
        {
          sub_category_id: "f69DkVQApCDZ",
          sub_category_name: "Xbox",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429197982?alt=media&token=b45fb999-b588-4697-a70a-78a3755b3be3",
          category_id: "15gzQj3yeAjZ",
          idx: 200,
        },
        {
          sub_category_id: "KiEBbFct3B9R",
          sub_category_name: "Nintendo",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429220703?alt=media&token=a7b0fe7c-75a1-4600-be90-a001aadb1938",
          category_id: "15gzQj3yeAjZ",
          idx: 200,
        },
        {
          sub_category_id: "sJvYmLcwxgVe",
          sub_category_name: "Farm Produce",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429256670?alt=media&token=3b7ca0db-f7d3-4586-aa14-2af8f524d810",
          category_id: "2vok2L7ysXpJ",
          idx: 200,
        },
        {
          sub_category_id: "kk9zcjvK3RRT",
          sub_category_name: "Equipment",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429279222?alt=media&token=0a56bc6a-449f-4aac-8920-6d75b58b44fa",
          category_id: "2vok2L7ysXpJ",
          idx: 200,
        },
        {
          sub_category_id: "MLysovXJmBMh",
          sub_category_name: "Fertilizers",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429297397?alt=media&token=2640c07f-1e47-47b9-9a10-7331f6821f64",
          category_id: "2vok2L7ysXpJ",
          idx: 200,
        },
        {
          sub_category_id: "mc6KyD1MNyNk",
          sub_category_name: "Seeds",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429314351?alt=media&token=23c9bb15-4ff1-428d-94b4-06264791f98f",
          category_id: "2vok2L7ysXpJ",
          idx: 200,
        },
        {
          sub_category_id: "5XSrHF88hRun",
          sub_category_name: "Others",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429363601?alt=media&token=99a420fb-02f3-462d-bd99-61be8d62b58a",
          category_id: "FCzoWfyupkiH",
          idx: 200,
        },
        {
          sub_category_id: "kxXBWVhYezMN",
          sub_category_name: "Gym Equipment",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429388287?alt=media&token=1b634a28-026d-4d61-9358-1f7fce6af10e",
          category_id: "FCzoWfyupkiH",
          idx: 200,
        },
        {
          sub_category_id: "nsGAbgFkY7wc",
          sub_category_name: "Accessories",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429418913?alt=media&token=af13da3f-ca03-442a-be8d-5f3fb1fd9fe8",
          category_id: "FCzoWfyupkiH",
          idx: 200,
        },
        {
          sub_category_id: "oDgoGxiPvMMY",
          sub_category_name: "Boots",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429436911?alt=media&token=75aa3485-7906-44fc-bbaf-c4c6a067b77c",
          category_id: "FCzoWfyupkiH",
          idx: 200,
        },
        {
          sub_category_id: "zWRwngq53RRN",
          sub_category_name: "Jerseys",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429459089?alt=media&token=cbb8e953-55e9-4a93-928e-1e8d2789142b",
          category_id: "FCzoWfyupkiH",
          idx: 200,
        },
        {
          sub_category_id: "FXkVBB4BHHZv",
          sub_category_name: "Cars",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429532007?alt=media&token=10dd0790-d83a-4947-a6c1-b9b2f4cb78af",
          category_id: "zTkFjDAJ6vqX",
          idx: 200,
        },
        {
          sub_category_id: "fdU7rdWTink5",
          sub_category_name: "Trucks",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429551894?alt=media&token=1f5c44f6-c5f2-4f6e-a777-42e114dfe9b1",
          category_id: "zTkFjDAJ6vqX",
          idx: 200,
        },
        {
          sub_category_id: "NEo4mMyuyPM6",
          sub_category_name: "Motocycles",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429574059?alt=media&token=1cf70e31-ba9a-422c-9ea7-5603b4bb99fd",
          category_id: "zTkFjDAJ6vqX",
          idx: 200,
        },
        {
          sub_category_id: "bbgfwNaGAKK3",
          sub_category_name: "Bikes",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429593100?alt=media&token=0df7d768-c5a8-4f79-bad9-89235e1488d3",
          category_id: "zTkFjDAJ6vqX",
          idx: 200,
        },
        {
          sub_category_id: "S1H1hJ6ws6m8",
          sub_category_name: "Make Up",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429638723?alt=media&token=eeb46dff-373f-4455-b9a6-a520a15e048f",
          category_id: "c1hfbSBdoSMd",
          idx: 200,
        },
        {
          sub_category_id: "9Xfk48rtbzcs",
          sub_category_name: "Hair Products",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429683419?alt=media&token=2c453b6c-5958-4564-94f6-c7a29b47b5f4",
          category_id: "c1hfbSBdoSMd",
          idx: 200,
        },
        {
          sub_category_id: "cWK5dv7YFWAB",
          sub_category_name: "Perfumes",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429696520?alt=media&token=b0b53c26-7716-4caa-8472-4cbd42b3a75a",
          category_id: "c1hfbSBdoSMd",
          idx: 200,
        },
        {
          sub_category_id: "FyMWKkpeNWC9",
          sub_category_name: "Kitchen Wares",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429769993?alt=media&token=2df2b338-4c27-439d-87da-9f1e9df76037",
          category_id: "WDHsYaBNz886",
          idx: 200,
        },
        {
          sub_category_id: "6s1vgWYyCz5v",
          sub_category_name: "Beddings",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429793157?alt=media&token=f54b7664-6f8f-4f4d-a16a-ba6b3491f859",
          category_id: "WDHsYaBNz886",
          idx: 200,
        },
        {
          sub_category_id: "9TbVFmJ1Qqa8",
          sub_category_name: "Home Appliances",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429835150?alt=media&token=db713551-2a76-404a-8cb2-fcb9a706d849",
          category_id: "WDHsYaBNz886",
          idx: 200,
        },
        {
          sub_category_id: "RiXbk4uHBGjR",
          sub_category_name: "Decorations",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429875584?alt=media&token=c0cc9eec-f589-4623-b66e-ab820863c2bd",
          category_id: "WDHsYaBNz886",
          idx: 200,
        },
        {
          sub_category_id: "6PJJnN7jVKQY",
          sub_category_name: "Lightings",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429894802?alt=media&token=be2e4a9a-ab9f-4bfb-ab06-8a4d33b8d89f",
          category_id: "WDHsYaBNz886",
          idx: 200,
        },
        {
          sub_category_id: "BowFb49vR5eA",
          sub_category_name: "Furniture",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637429912133?alt=media&token=48a61026-3822-4a3e-a116-79951e1c13e2",
          category_id: "WDHsYaBNz886",
          idx: 200,
        },
        {
          sub_category_id: "DEfpDujPEfET",
          sub_category_name: "Dolls",
          sub_category_icon:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/subcategory%2F1637532790067?alt=media&token=a26e0534-a0f2-40d1-8291-224972284db9",
          category_id: "Zo2qWWgTpdMK",
          idx: 200,
        },
      ],
      {}
    );
  },

  down: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkDelete("SubCategory", {}, {});
  },
};
