"use strict";

import { Sequelize } from "sequelize";
import {
  DataTypes,
  INTEGER,
  STRING,
  DATE,
  UUID,
  UUIDV4,
  TEXT,
  BIGINT,
  DECIMAL,
  BOOLEAN,
  QueryInterface,
  ModelAttributes,
  Model,
  QueryInterfaceCreateTableOptions,
  QueryInterfaceIndexOptions,
} from "sequelize";
import { MethodOfSub } from "../../enum/coins.enum";
import { FeedbackStatus } from "../../enum/feedback.enum";
import { ChatStatus } from "../../enum/product.chats.enum";
import { ProductCondition, ProductStatus } from "../../enum/product.enum";
import { ReportedProductStatus } from "../../enum/reported.products.enum";
import { TokenTypes } from "../../enum/token.enum";
import { BaseCurrency, OnlineStatus } from "../../enum/user.enum";
import CONSTANTS from "../../utils/constants";

/**
 * Actions summary:
 *
 * createTable "BusinessCategories", deps: []
 * createTable "ErrorQueueLogs", deps: []
 * createTable "Files", deps: []
 * createTable "Industries", deps: []
 * createTable "Merchants", deps: [Merchants, Files]
 * createTable "Accounts", deps: [Merchants]
 * createTable "Beneficiaries", deps: [Merchants]
 * createTable "DevKits", deps: [Merchants]
 * createTable "KYC", deps: [Merchants, Files, Files, BusinessCategories, Industries]
 * createTable "KycFiles", deps: [KYC, Files]
 * createTable "KYCHistory", deps: [KYC]
 * createTable "KYCPersonnel", deps: [KYC]
 * createTable "Otps", deps: [Merchants]
 * createTable "Settings", deps: [Merchants]
 * createTable "Settlements", deps: [Merchants]
 * createTable "StatusHistory", deps: [Merchants]
 * addIndex "otps_merchant_id_code" to table "Otps"
 *
 **/

var info = {
  revision: 1,
  name: "noname",
  created: "2021-09-08T11:08:52.647Z",
  comment: "",
};
interface Params {
  name: string;
  data: ModelAttributes<Model<any, any>, any>;
  options: QueryInterfaceCreateTableOptions;
}
interface MigrationCommands {
  fn: string;
  params: Params[];
}
// var migrationCommands:MigrationCommands[] = [
var migrationCommands = [
  {
    fn: "createTable",
    params: [
      "AppSettings",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        d_key: {
          type: DataTypes.STRING,
        },
        value: {
          type: DataTypes.TEXT,
        },
        last_updated_by: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Category",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        category_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: CONSTANTS.UUID,
          comment: "Category Id",
        },
        category_name: {
          type: DataTypes.STRING,
        },
        category_icon: {
          type: DataTypes.STRING,
        },
        idx: {
          type: DataTypes.INTEGER,
          defaultValue: 200,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Coins",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          comment: "Coins Id",
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        method_of_subscription: {
          type: DataTypes.ENUM,
          values: Object.values(MethodOfSub),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Faqs",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        faq_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "Faqs Id",
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        answer: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          defaultValue: 0,
        },
        added_by: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Feedback",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        feedback_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "Feedback Id",
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          values: Object.values(FeedbackStatus),
          defaultValue: FeedbackStatus.OPEN,
        },
        resolved_by: {
          type: DataTypes.STRING,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "ImageProduct",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        image_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "ImageProduct Id",
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image_path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idx: {
          type: DataTypes.INTEGER,
          defaultValue: 200,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "ProductChats",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        product_chat_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "ProductChats Id",
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        offer_product_id: {
          type: DataTypes.STRING,
        },
        sender_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        receiver_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sender_closed_deal: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        receiver_closed_deal: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        chat_status: {
          type: DataTypes.ENUM,
          values: Object.values(ChatStatus),
          defaultValue: ChatStatus.OPEN,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Product",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        product_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "Product Id",
        },
        order_id: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        product_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sub_category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        product_suggestion: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        product_condition: {
          type: DataTypes.ENUM,
          values: Object.values(ProductCondition),
          defaultValue: ProductCondition.FAIRLY_USED,
        },
        product_status: {
          type: DataTypes.ENUM,
          values: Object.values(ProductStatus),
          defaultValue: ProductStatus.ACTIVE,
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_address_city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_address_lat: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        user_address_long: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        upload_price: {
          type: DataTypes.INTEGER,
          defaultValue: 100,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "ProductViews",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        view_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "ProductViews Id",
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "ReportedProducts",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        reported_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "ReportedProducts Id",
        },
        reported_by: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        reported_message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        uploaded_by: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM,
          values: Object.values(ReportedProductStatus),
          defaultValue: ReportedProductStatus.OPEN,
        },
        resolved_by: {
          type: DataTypes.STRING,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "SavedProducts",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          comment: "SavedProducts Id",
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "SubCategory",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        sub_category_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "SubCategory Id",
        },
        sub_category_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sub_category_icon: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idx: {
          type: DataTypes.INTEGER,
          defaultValue: 200,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Token",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          comment: "Token Id",
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          values: Object.values(TokenTypes),
          defaultValue: TokenTypes.REFRESH,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "User",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING,
          defaultValue: CONSTANTS.UUID,
          primaryKey: true,
          comment: "Users Id",
        },
        uid: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: DataTypes.STRING,
        mobile_number: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        radius: DataTypes.INTEGER,
        address: DataTypes.STRING,
        address_lat: DataTypes.FLOAT,
        address_long: DataTypes.FLOAT,
        state: DataTypes.STRING,
        profile_photo: DataTypes.STRING,
        device_token: DataTypes.STRING,
        notification: {
          type: DataTypes.JSONB,
          defaultValue: {
            general: true,
            call: true,
            chat: true,
            product: true,
          },
        },
        user_level: DataTypes.INTEGER,
        online_status: {
          type: DataTypes.ENUM,
          values: Object.values(OnlineStatus),
          defaultValue: OnlineStatus.ONLINE,
        },
        user_app_version: DataTypes.INTEGER,
        base_currency: {
          type: DataTypes.ENUM,
          values: Object.values(BaseCurrency),
          defaultValue: BaseCurrency.NGN,
        },
        last_login: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        suspended: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        suspended_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        un_suspended_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        ip_ban: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        is_verified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        version: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {},
    ],
  },
  //   {
  //     fn: "addIndex",
  //     params: [
  //       "Otps",
  //       ["merchant_id", "code"],
  //       {
  //         indexName: "otps_merchant_id_code",
  //         name: "otps_merchant_id_code",
  //         indicesType: "UNIQUE",
  //         type: "UNIQUE",
  //       },
  //     ],
  //   },
];

const dateDefault: ModelAttributes<Model<any, any>, any> = {
  createdAt: {
    type: DATE,
    field: "createdAt",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updatedAt: {
    type: DATE,
    field: "updatedAt",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  deletedAt: {
    type: DATE,
    field: "deletedAt",
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
};

function up({ queryInterface }: { queryInterface: QueryInterface }) {
  var index = 0;
  return new Promise<void>(function (resolve, reject) {
    function next() {
      if (index < migrationCommands.length) {
        let command = migrationCommands[index];
        console.log("[#" + index + "] execute: " + command.fn);
        index++;
        //@ts-ignore
        // command.params[1] = { ...command.params[1], ...dateDefault };
        //@ts-ignore
        // queryInterface[command.fn]
        //   .apply(queryInterface, command.params)
        //   .then(next, reject);

        if (command.fn == "createTable") {
          const { params } = command;
          const tableName = params[0] as string;
          const model = params[1] as ModelAttributes<Model<any, any>, any>;
          const options = params[2] as QueryInterfaceCreateTableOptions;
          const attributes = { ...model, ...dateDefault };
          queryInterface
            .createTable(tableName, attributes, options)
            .then(next, reject);
        } else if (command.fn == "addIndex") {
          const { params } = command;
          const tableName = params[0] as string;
          const attributes = params[1] as string[];
          const options = params[2] as QueryInterfaceIndexOptions;
          queryInterface
            .addIndex(tableName, attributes, options)
            .then(next, reject);
        }
      } else resolve();
    }
    next();
  });
}

async function down({ queryInterface }: { queryInterface: QueryInterface }) {}

export default { up, down };
