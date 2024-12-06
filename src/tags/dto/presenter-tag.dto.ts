import { Expose, Type } from "class-transformer";
import { PresenterUserDto } from "src/users/dto/presenter-user.dto";

export const GROUP_TAG = 'group_tag_details';
export const GROUP_ALL_TAGS = 'group_all_tags';

export class PresenterTagDto {

    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
    id: number;

    @Expose({ groups: [GROUP_TAG] })
    createdAt: Date;

    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
    label: string;
  
    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
    slug: string;
  
    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
    @Type(() => PresenterUserDto)
    user: PresenterUserDto;
  }