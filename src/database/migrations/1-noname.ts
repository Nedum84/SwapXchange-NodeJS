"use strict";

import {
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
      "BusinessCategories",
      {
        id: {
          type: INTEGER,
          field: "id",
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        slug: {
          type: STRING,
          field: "slug",
          unique: true,
          required: true,
          allowNull: false,
        },
        name: {
          type: STRING,
          field: "name",
          required: true,
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "ErrorQueueLogs",
      {
        id: {
          type: UUID,
          field: "id",
          defaultValue: UUIDV4,
          primaryKey: true,
        },
        payload: {
          type: TEXT,
          field: "payload",
          allowNull: false,
        },
        error: {
          type: STRING,
          field: "error",
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Files",
      {
        id: {
          type: BIGINT,
          field: "id",
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        ext: {
          type: STRING,
          field: "ext",
          allowNull: false,
        },
        key: {
          type: STRING,
          field: "key",
          unique: true,
          allowNull: false,
        },
        file_name: {
          type: STRING,
          field: "file_name",
        },
        url: {
          type: STRING,
          field: "url",
        },
        bucket: {
          type: STRING,
          field: "bucket",
        },
        disk: {
          type: STRING,
          field: "disk",
          defaultValue: "s3",
        },
        verified_at: {
          type: DATE,
          field: "verified_at",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Industries",
      {
        id: {
          type: INTEGER,
          field: "id",
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        name: {
          type: STRING,
          field: "name",
          allowNull: false,
        },
        mcc: {
          type: STRING,
          field: "mcc",
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Merchants",
      {
        id: {
          type: BIGINT,
          field: "id",
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        account_id: {
          type: STRING,
          field: "account_id",
          unique: true,
          allowNull: false,
        },
        slug: {
          type: STRING,
          field: "slug",
          unique: true,
          allowNull: false,
        },
        display_name: {
          type: STRING,
          field: "display_name",
          allowNull: false,
        },
        description: {
          type: STRING,
          field: "description",
        },
        acquirer_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "set null",
          references: {
            model: "Merchants",
            key: "id",
          },
          allowNull: true,
          field: "acquirer_id",
        },
        refer_fee: {
          type: DECIMAL,
          field: "refer_fee",
        },
        phone: {
          type: STRING,
          field: "phone",
        },
        phone_verified_at: {
          type: DATE,
          field: "phone_verified_at",
        },
        email: {
          type: STRING,
          field: "email",
          validate: {
            isEmail: true,
          },
          allowNull: false,
        },
        email_verified_at: {
          type: DATE,
          field: "email_verified_at",
        },
        address: {
          type: STRING,
          field: "address",
        },
        logo_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "set null",
          references: {
            model: "Files",
            key: "id",
          },
          allowNull: true,
          field: "logo_id",
        },
        is_live: {
          type: BOOLEAN,
          field: "is_live",
          defaultValue: false,
        },
        is_developer: {
          type: BOOLEAN,
          field: "is_developer",
          defaultValue: false,
        },
        is_system: {
          type: BOOLEAN,
          field: "is_system",
          defaultValue: false,
        },
        suspended_at: {
          type: DATE,
          field: "suspended_at",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Accounts",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        gt_account_number: {
          type: STRING,
          field: "gt_account_number",
        },
        gt_account_name: {
          type: STRING,
          field: "gt_account_name",
        },
        dom_account_number: {
          type: STRING,
          field: "dom_account_number",
        },
        dom_account_name: {
          type: STRING,
          field: "dom_account_name",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Beneficiaries",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        name: {
          type: STRING,
          field: "name",
          allowNull: false,
        },
        account_number: {
          type: STRING,
          field: "account_number",
          allowNull: false,
        },
        currency_id: {
          type: STRING,
          field: "currency_id",
          allowNull: false,
        },
        bank_name: {
          type: STRING,
          field: "bank_name",
          allowNull: false,
        },
        bank_code: {
          type: STRING,
          field: "bank_code",
          allowNull: false,
        },
        phone_number: {
          type: STRING,
          field: "phone_number",
        },
        email: {
          type: STRING,
          field: "email",
        },
        nick_name: {
          type: STRING,
          field: "nick_name",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "DevKits",
      {
        id: {
          type: INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        test_p_key: {
          type: STRING,
          field: "test_p_key",
          unique: true,
          allowNull: false,
        },
        test_s_key: {
          type: STRING,
          field: "test_s_key",
          unique: true,
          allowNull: false,
        },
        live_p_key: {
          type: STRING,
          field: "live_p_key",
          unique: true,
        },
        live_s_key: {
          type: STRING,
          field: "live_s_key",
          unique: true,
        },
        redirect_url: {
          type: STRING,
          field: "redirect_url",
        },
        webhook_url: {
          type: STRING,
          field: "webhook_url",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "KYC",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        bank: {
          type: STRING,
          field: "bank",
        },
        bank_code: {
          type: STRING,
          field: "bank_code",
        },
        account_number: {
          type: STRING,
          field: "account_number",
        },
        account_name: {
          type: STRING,
          field: "account_name",
        },
        bvn: {
          type: STRING,
          field: "bvn",
        },
        nin: {
          type: STRING,
          field: "nin",
        },
        rc_number: {
          type: STRING,
          field: "rc_number",
        },
        business_name: {
          type: STRING,
          field: "business_name",
        },
        business_desc: {
          type: STRING,
          field: "business_desc",
        },
        country_code: {
          type: STRING,
          field: "country_code",
        },
        country: {
          type: STRING,
          field: "country",
        },
        state_id: {
          type: STRING,
          field: "state_id",
        },
        state: {
          type: STRING,
          field: "state",
        },
        city: {
          type: STRING,
          field: "city",
        },
        address: {
          type: STRING,
          field: "address",
        },
        cac_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "set null",
          references: {
            model: "Files",
            key: "id",
          },
          allowNull: true,
          field: "cac_id",
        },
        memo_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "set null",
          references: {
            model: "Files",
            key: "id",
          },
          allowNull: true,
          field: "memo_id",
        },
        category_id: {
          type: INTEGER,
          onUpdate: "CASCADE",
          onDelete: "set null",
          references: {
            model: "BusinessCategories",
            key: "id",
          },
          allowNull: true,
          field: "category_id",
        },
        industry_id: {
          type: INTEGER,
          onUpdate: "CASCADE",
          onDelete: "set null",
          references: {
            model: "Industries",
            key: "id",
          },
          allowNull: true,
          field: "industry_id",
        },
        completed_at: {
          type: DATE,
          field: "completed_at",
        },
        approved_at: {
          type: DATE,
          field: "approved_at",
        },
        last_reject_at: {
          type: DATE,
          field: "last_reject_at",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "KycFiles",
      {
        id: {
          type: BIGINT,
          field: "id",
          unique: true,
          autoIncrement: true,
          primaryKey: true,
        },
        kyc_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "KYC",
            key: "id",
          },
          allowNull: true,
          field: "kyc_id",
        },
        file_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Files",
            key: "id",
          },
          allowNull: true,
          field: "file_id",
        },
        group: {
          type: BIGINT,
          field: "group",
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "KYCHistory",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        kyc_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "KYC",
            key: "id",
          },
          field: "kyc_id",
          allowNull: false,
        },
        admin_id: {
          type: STRING,
          field: "admin_id",
          required: true,
          allowNull: false,
        },
        admin_name: {
          type: STRING,
          field: "admin_name",
          required: true,
          allowNull: false,
        },
        reason: {
          type: TEXT,
          field: "reason",
          required: true,
          allowNull: false,
        },
        approved: {
          type: BOOLEAN,
          field: "approved",
          required: true,
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "KYCPersonnel",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        kyc_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "KYC",
            key: "id",
          },
          field: "kyc_id",
          allowNull: false,
        },
        name: {
          type: STRING,
          field: "name",
          required: true,
          allowNull: false,
        },
        email: {
          type: STRING,
          field: "email",
          required: true,
          allowNull: false,
        },
        job_title: {
          type: STRING,
          field: "job_title",
          required: true,
          allowNull: false,
        },
        bvn: {
          type: STRING,
          field: "bvn",
          required: true,
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Otps",
      {
        id: {
          type: INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        code: {
          type: STRING,
          field: "code",
          allowNull: false,
        },
        medium: {
          type: STRING,
          field: "medium",
          defaultValue: "phone",
        },
        expire_at: {
          type: DATE,
          field: "expire_at",
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Settings",
      {
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          primaryKey: true,
          allowNull: false,
        },
        key: {
          type: STRING,
          field: "key",
          primaryKey: true,
          allowNull: false,
        },
        value: {
          type: STRING,
          field: "value",
          allowNull: false,
        },
        data_type: {
          type: STRING,
          field: "data_type",
          defaultValue: "string",
        },
        admin_lock: {
          type: BOOLEAN,
          field: "admin_lock",
          defaultValue: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Settlements",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        currency_id: {
          type: STRING,
          field: "currency_id",
          defaultValue: "NGN",
          allowNull: false,
        },
        flat_fee: {
          type: INTEGER,
          field: "flat_fee",
          defaultValue: 5000,
          allowNull: false,
        },
        service_charge: {
          type: DECIMAL,
          field: "service_charge",
          defaultValue: 1.2,
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "StatusHistory",
      {
        id: {
          type: BIGINT,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        merchant_id: {
          type: BIGINT,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: {
            model: "Merchants",
            key: "id",
          },
          field: "merchant_id",
          allowNull: false,
        },
        admin_id: {
          type: STRING,
          field: "admin_id",
          required: true,
          allowNull: false,
        },
        admin_name: {
          type: STRING,
          field: "admin_name",
          required: true,
          allowNull: false,
        },
        reason: {
          type: TEXT,
          field: "reason",
          required: true,
          allowNull: false,
        },
        suspended: {
          type: BOOLEAN,
          field: "suspended",
          required: true,
          allowNull: false,
        },
        createdAt: {
          type: DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: {
          type: DATE,
          field: "deletedAt",
        },
      },
      {},
    ],
  },
  {
    fn: "addIndex",
    params: [
      "Otps",
      ["merchant_id", "code"],
      {
        indexName: "otps_merchant_id_code",
        name: "otps_merchant_id_code",
        indicesType: "UNIQUE",
        type: "UNIQUE",
      },
    ],
  },
];

function up({ queryInterface }: { queryInterface: QueryInterface }) {
  var index = 0;
  return new Promise<void>(function (resolve, reject) {
    function next() {
      if (index < migrationCommands.length) {
        let command = migrationCommands[index];
        console.log("[#" + index + "] execute: " + command.fn);
        index++;
        //@ts-ignore
        // queryInterface[command.fn]
        //   .apply(queryInterface, command.params)
        //   .then(next, reject);

        if (command.fn == "createTable") {
          const { params } = command;
          const tableName = params[0] as string;
          const model = params[1] as ModelAttributes<Model<any, any>, any>;
          const options = params[2] as QueryInterfaceCreateTableOptions;
          queryInterface
            .createTable(tableName, model, options)
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
