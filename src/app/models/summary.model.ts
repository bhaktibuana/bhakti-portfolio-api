import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
} from 'sequelize';

import { MySQL } from '@/shared/utils';
import { About } from '@/app/models/about.model';

export class Summary extends Model<
	InferAttributes<Summary>,
	InferCreationAttributes<Summary>
> {
	public id?: number;
	public english!: string;
	public indonesian!: string;
	public created_at?: Date;
	public updated_at?: Date;
	public deleted_at?: Date | null;

	public static associate() {
		Summary.hasOne(About, {
			as: 'summaries',
			foreignKey: 'summary_id',
		});
	}
}

Summary.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		english: {
			type: DataTypes.TEXT(),
			allowNull: false,
		},
		indonesian: {
			type: DataTypes.TEXT(),
			allowNull: false,
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
		tableName: 'summaries',
		freezeTableName: false,
		timestamps: false,
		sequelize: MySQL.getMainDbConnection(),
	},
);
