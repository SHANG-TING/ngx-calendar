import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarWeekViewComponent } from './ngx-calendar-week-view';

const COMPONENTS = [
  NgxCalendarWeekViewComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCalendarWeekModule { }
