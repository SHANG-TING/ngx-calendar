import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCalendarDayModule } from './day/ngx-calendar-day.module';
import { NgxCalendarMonthModule } from './month/ngx-calendar-month.module';
import { NgxCalendarComponent } from './ngx-calendar.component';
import { NgxCalendarWeekModule } from './week/ngx-calendar-week.module';

@NgModule({
  imports: [CommonModule, NgxCalendarMonthModule, NgxCalendarWeekModule, NgxCalendarDayModule],
  declarations: [NgxCalendarComponent],
  exports: [NgxCalendarComponent],
})
export class NgxCalendarModule {}
