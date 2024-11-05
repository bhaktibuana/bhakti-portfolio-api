import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
} from 'sequelize';

import { MySQL } from '@/shared/utils';
import { User } from '@/app/models/user.model';
import { Summary } from '@/app/models/summary.model';

export class About extends Model<
	InferAttributes<About>,
	InferCreationAttributes<About>
> {
	public id?: number;
	public user_id!: number;
	public name!: string;
	public title!: string;
	public summary_id!: number;
	public is_active?: boolean;
	public created_at?: Date;
	public updated_at?: Date;
	public deleted_at?: Date | null;

	public static associate() {
		About.belongsTo(User, {
			as: 'users',
			foreignKey: 'user_id',
		});
		About.belongsTo(Summary, {
			as: 'summaries',
			foreignKey: 'summary_id',
		});
	}
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
		summary_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'summaries',
				key: 'id',
			},
			onDelete: 'CASCADE',
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
