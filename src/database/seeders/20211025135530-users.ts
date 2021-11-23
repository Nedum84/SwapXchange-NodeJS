"use strict";

import { QueryInterface } from "sequelize";

export default {
  up: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkInsert(
      "User",
      [
        {
          user_id: "9344639296",
          uid: "FqOzS1YbO7YXhWU1OrhUnNvY7SG",
          name: "Nelson Nedum",
          mobile_number: "08160054545",
          address: "Odumosu Street, Ketu 105102, Lagos, Nigeria",
          profile_photo:
            "https://firebasestorage.googleapis.com/v0/b/swapxchange-bc2c8.appspot.com/o/profile%2F1637423414711?alt=media&token=bf5b801e-3fdb-4c1a-a9e8-1caeaf6cb44d",
        },
      ],
      {}
    );
  },

  down: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkDelete("User", {}, {});
  },
};
