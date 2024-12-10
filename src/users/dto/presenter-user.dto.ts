import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class PresenterUserDto {
    @Expose()
    id: number;

    @Expose()
    @IsString()
    username: string;
  }
  