import { DataTypes, InferAttributes, Model } from 'sequelize';

import { MySQL } from '@/shared/utils';

export class AboutDetailView extends Model<InferAttributes<AboutDetailView>> {
	public id!: number;
	public user_id!: number;
	public name!: string;
	public title!: string;
	public is_active!: boolean;
	public summary_id!: number;
	public summary_english!: string;
	public symmary_indonesian!: string;
	public created_at!: Date;
	public updated_at!: Date;
}

AboutDetailView.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		summary_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		summary_english: {
			type: DataTypes.TEXT(),
			allowNull: false,
		},
		symmary_indonesian: {
			type: DataTypes.TEXT(),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: 'about_details_view',
		freezeTableName: false,
		timestamps: false,
		sequelize: MySQL.getMainDbConnection(),
	},
);
