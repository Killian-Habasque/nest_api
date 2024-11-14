import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('User not found');
    }

    const website = this.websiteRepository.create({
      ...createWebsiteDto,
      user,
    });

    return this.websiteRepository.save(website);
  }

  async findAll(): Promise<Website[]> {
    return this.websiteRepository.find({ relations: ['user'] });
  }

  async findOne(id: number, userId: number): Promise<Website> {
    const website = await this.websiteRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!website) {
      throw new NotFoundException('Website not found');
    }

    if (website.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to view this website.");
    }

    return website;
  }

  async update(id: number, updateWebsiteDto: UpdateWebsiteDto, userId: number): Promise<Website> {
    const website = await this.websiteRepository.findOne({ where: { id }, relations: ['user'] });

    if (!website) {
      throw new NotFoundException('Website not found');
    }

    if (website.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to update this website.");
    }

    await this.websiteRepository.update(id, updateWebsiteDto);
    return this.websiteRepository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number): Promise<void> {
    const website = await this.websiteRepository.findOne({ where: { id }, relations: ['user'] });

    if (!website) {
      throw new NotFoundException('Website not found');
    }

    if (website.user.id !== userId) {
      throw new ForbiddenException("You don't have permission to delete this website.");
    }

    await this.websiteRepository.delete(id);
  }
}

