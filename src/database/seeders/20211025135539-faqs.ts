'use strict';

import {QueryInterface} from "sequelize";
import CONSTANTS from "../../utils/constants";

export default  {
  up: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkInsert(
        'Faqs',
        [
          {
            faq_id:CONSTANTS.UUID(),
            question: 'How are you doing today',
            answer: 'I am OK! You...',
            category: 1,
            added_by: '221122',
          },
          {
            faq_id:CONSTANTS.UUID(),
            question: 'How are you doing today2',
            answer: 'I am OK! You...',
            category: 1,
            added_by: '221122',
          },
          {
            faq_id:CONSTANTS.UUID(),
            question: 'How are you doing today3',
            answer: 'I am OK! You...',
            category: 1,
            added_by: '221122',
          },
          {
            faq_id:CONSTANTS.UUID(),
            question: 'How are you doing today4',
            answer: 'I am OK! You...',
            category: 1,
            added_by: '221122',
          },
        ],
        {}
    );
  },

  down: async ({ queryInterface }: { queryInterface: QueryInterface }) => {
    await queryInterface.bulkDelete('Files', {}, {});
  }
};
