import { Category } from '../schemas/book.schema';
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
export class updatedBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;
}
