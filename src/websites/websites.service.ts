import { Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createWebsiteDto: CreateWebsiteDto, userId: number): Promise<Website> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const website = this.websiteRepository.create({
      ...createWebsiteDto,
      user,
    });

    return this.websiteRepository.save(website);
  }

  findAll(): Promise<Website[]> {
    return this.websiteRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Website> {
    return this.websiteRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateWebsiteDto: UpdateWebsiteDto): Promise<Website> {
    await this.websiteRepository.update(id, updateWebsiteDto);
    return this.websiteRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.websiteRepository.delete(id);
  }
}

