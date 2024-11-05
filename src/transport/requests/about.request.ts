import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class AboutCreateRequestBody {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	title!: string;

	@IsString()
	@IsNotEmpty()
	summary_english!: string;

	@IsString()
	@IsNotEmpty()
	summary_indonesian!: string;
}

export class AboutSetActiveRequestBody {
	@IsBoolean()
	@IsNotEmpty()
	is_active!: boolean;
}

export class AboutSetActiveRequestParams {
	@Transform(({ value }) => {
		return parseInt(value);
	})
	@IsNumber()
	@IsNotEmpty()
	id!: number;
}
