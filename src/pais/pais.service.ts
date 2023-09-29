import { BadRequestException, Injectable } from '@nestjs/common';
import { InvgateService } from 'src/invgate/invgate.service';
import { Country } from './entities/pais.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountryService {
  constructor(
    private readonly invgateService: InvgateService,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll() {
    return await this.countryRepository.find({
      where: { active: true },
    });
  }

  async updatedCountries() {
    try {
      const countries = await this.invgateService.getAllLocations();
      countries.forEach(async (country) => {
        const existsCountry = await this.countryRepository.findOne({
          where: { id: Number(country.id) },
        });
        if (existsCountry) {
          if (existsCountry.name !== country.name) {
            existsCountry.name = country.name;
            await this.countryRepository.save(existsCountry);
          }
        } else {
          const newCountry = this.countryRepository.create({
            id: Number(country.id),
            name: country.name,
          });
          await this.countryRepository.save(newCountry);
        }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
