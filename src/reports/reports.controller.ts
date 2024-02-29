import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { IsLoggedIn } from '../guards/isLoggedIn.guard';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report-dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { isAdmin } from 'src/guards/isAdmin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(public reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(IsLoggedIn)
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return await this.reportsService.create(body, user);
  }

  @Patch(':id')
  @UseGuards(isAdmin)
  approveReports(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
