'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('abouts', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			summary_en: {
				type: Sequelize.TEXT(),
				allowNull: false,
			},
			summary_id: {
				type: Sequelize.TEXT(),
				allowNull: false,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('abouts');
	},
};
