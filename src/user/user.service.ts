import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password, birthAt }: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        birthAt: new Date(birthAt),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async read() {
    return this.prisma.user.findMany();
  }

  async readOne(id: number) {
    await this.userExists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePatchUserDTO) {
    await this.userExists(id);

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.userExists(id);

    return this.prisma.user.delete({ where: { id } });
  }

  async userExists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Não existe usuário com o id: ${id}`);
    }
    return;
  }
}
