import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.descorator';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password, birthAt }: CreateUserDTO) {
    return this.userService.create({ name, email, password, birthAt });
  }

  @Get()
  async read() {
    return this.userService.read();
  }

  @Get(':id')
  async readOne(@ParamId() id) {
    console.log(id, typeof id);
    return this.userService.readOne(id);
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdatePatchUserDTO,
  ) {
    return this.userService.update(id, data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdatePutUserDTO) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
