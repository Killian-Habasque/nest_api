import { Expose, Type } from "class-transformer";
import { PresenterUserDto } from "src/users/dto/presenter-user.dto";

export class PresenterTagDto {

    @Expose()
    id: number;

    @Expose()
    createdAt: Date;

    @Expose()
    label: string;
  
    @Expose()
    slug: string;
  
    @Expose()
    @Type(() => PresenterUserDto)
    user: PresenterUserDto;
  }