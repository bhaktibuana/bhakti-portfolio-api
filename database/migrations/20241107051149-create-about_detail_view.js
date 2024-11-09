'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.sequelize.query(`
      CREATE VIEW about_details_view AS
      SELECT
        abt.id,
        abt.user_id,
        abt.name, 
        abt.title,
        abt.is_active,
        abt.summary_id,
        smr.english summary_english,
        smr.indonesian symmary_indonesian,
        abt.created_at,
        abt.updated_at
      FROM abouts abt
      JOIN summaries smr ON abt.summary_id = smr.id
      WHERE abt.is_active = 1;
    `);
	},

	async down(queryInterface) {
		await queryInterface.sequelize.query(
			'DROP VIEW IF EXISTS about_details_view;',
		);
	},
};
