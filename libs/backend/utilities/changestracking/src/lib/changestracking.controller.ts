import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ChangestrackingService } from './changestracking.service';
import { CreateChangestrackingDto } from './dto/create-changestracking.dto';
import { UpdateChangestrackingDto } from './dto/update-changestracking.dto';

@Controller('changestracking')
export class ChangestrackingController {
  constructor(private readonly changestrackingService: ChangestrackingService) {}

  @Post()
  async create(@Body() createChangestrackingDto: CreateChangestrackingDto, @Query('crudQuery') crudQuery: string) {
    const created = await this.changestrackingService.create(createChangestrackingDto, { crudQuery });
    return created;
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.changestrackingService.findMany({ crudQuery });
    return matches;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    const match = await this.changestrackingService.findOne(id, { crudQuery });
    return match;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChangestrackingDto: UpdateChangestrackingDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    const updated = await this.changestrackingService.update(id, updateChangestrackingDto, { crudQuery });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.changestrackingService.remove(id, { crudQuery });
  }
}
