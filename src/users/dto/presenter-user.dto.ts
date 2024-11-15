import { Expose } from "class-transformer";

export class PresenterUserDto {
    @Expose()
    id: number;

    @Expose()
    username: string;
  }
  