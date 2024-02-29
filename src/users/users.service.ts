import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public repo: Repository<User>,
  ) {}

  create(email: string, password: string): Promise<User | null> {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  find(attrs: Partial<User>) {
    return this.repo.find({ where: Object(attrs) });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return this.repo.remove(user);
  }
}
