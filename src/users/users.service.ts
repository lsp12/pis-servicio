import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptPassword } from './bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcryptPassword(createUserDto.password);
    const exist = await this.usersRepository.findOne({
      username: createUserDto.username,
    });
    if (exist) throw new BadRequestException('El usuario ya existe');
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await bcryptPassword(updateUserDto.password);
    return await this.usersRepository.update(id, {
      username: updateUserDto.username,
      password: updateUserDto.password,
    });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
