import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarComponent } from './ngx-calendar.component';
import { NgxCalendarMonthModule } from './month';
import { NgxCalendarWeekModule } from './week';
import { NgxCalendarDayModule } from './day';

const COMPONENTS = [
  NgxCalendarComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxCalendarMonthModule,
    NgxCalendarWeekModule,
    NgxCalendarDayModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCalendarModule { }
