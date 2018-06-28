import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarMonthViewComponent } from './';

const COMPONENTS = [
  NgxCalendarMonthViewComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NgxCalendarMonthModule { }
