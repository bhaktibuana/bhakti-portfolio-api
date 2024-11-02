import mongoose, { Connection } from 'mongoose';
import { Console } from '@/shared/utils/console.util';

export class Mongo {
	private static utilityDbConnection: Connection;

	/**
	 * Connect to utility_db for SystemLog model
	 *
	 * @param dbDsn
	 * @param dbName
	 */
	public static async connectUtilityDb(dbDsn: string, dbName: string) {
		try {
			Mongo.utilityDbConnection = mongoose.createConnection(dbDsn, {
				dbName,
			});
			Console.info(`Successfully connected to utility_db (${dbName})`);
		} catch (error) {
			Console.error(error);
			process.exit(1);
		}
	}

	/**
	 * Disconnect all connections
	 */
	public static async disconnectAll() {
		await Promise.all([Mongo.utilityDbConnection?.close()]);
		Console.info('All MongoDB connections disconnected.');
	}

	/**
	 * Get the utility_db connection instance
	 */
	public static getUtilityDbConnection(): Connection {
		return Mongo.utilityDbConnection;
	}
}
