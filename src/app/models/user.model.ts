import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
} from 'sequelize';

import { MySQL } from '@/shared/utils';
import { About } from '@/app/models/about.model';

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	public id?: number;
	public email!: string;
	public password!: string;
	public created_at?: Date;
	public updated_at?: Date;
	public deleted_at?: Date | null;
	public is_admin?: boolean;

	public static associate() {
		User.hasMany(About, {
			as: 'users',
			foreignKey: 'user_id',
		});
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
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
		is_admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: 'users',
		freezeTableName: false,
		timestamps: false,
		sequelize: MySQL.getMainDbConnection(),
	},
);
