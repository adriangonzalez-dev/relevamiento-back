import { BadRequestException, Injectable } from '@nestjs/common';
import { InvgateService } from 'src/invgate/invgate.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/tipo.entity';

@Injectable()
export class TipoService {
  constructor(
    private readonly invgateService: InvgateService,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async updateTypes() {
    try {
      const categories = await this.invgateService.getAllCategories();
      const findCategories = categories.filter((category) => {
        return category.parent_category_id === 363;
      });
      findCategories.forEach(async (category) => {
        const existsCategory = await this.typeRepository.findOne({
          where: { id: Number(category.id) },
        });
        if (existsCategory) {
          if (existsCategory.name !== category.name) {
            existsCategory.name = category.name;
            await this.typeRepository.save(existsCategory);
          }
        } else {
          const newCategory = this.typeRepository.create({
            id: Number(category.id),
            name: category.name,
          });
          newCategory.id = Number(newCategory.id);
          await this.typeRepository.save(newCategory);
        }
      });
      const types = await this.typeRepository.find();
      return types;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
