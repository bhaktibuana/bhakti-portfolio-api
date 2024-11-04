import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
} from 'sequelize';

import { MySQL } from '@/shared/utils';

export class About extends Model<
	InferAttributes<About>,
	InferCreationAttributes<About>
> {
	public id?: number;
	public user_id!: number;
	public name!: string;
	public title!: string;
	public summary_en!: string;
	public summary_id!: string;
	public is_active?: boolean;
	public created_at?: Date;
	public updated_at?: Date;
	public deleted_at?: Date | null;
}

About.init(
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
			references: {
				model: 'users',
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		summary_en: {
			type: DataTypes.TEXT(),
			allowNull: false,
		},
		summary_id: {
			type: DataTypes.TEXT(),
			allowNull: false,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('NOW()'),
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('NOW()'),
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: 'abouts',
		freezeTableName: false,
		timestamps: false,
		sequelize: MySQL.getMainDbConnection(),
	},
);
