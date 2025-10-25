import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ select: { id: true, email: true, name: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true } });
  }
}
