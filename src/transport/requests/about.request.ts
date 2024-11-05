import { IsString, IsNotEmpty } from 'class-validator';

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
