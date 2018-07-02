import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarDayViewComponent } from './ngx-calendar-day-view';

const COMPONENTS = [
  NgxCalendarDayViewComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCalendarDayModule { }
