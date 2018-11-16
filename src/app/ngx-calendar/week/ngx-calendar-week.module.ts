import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarWeekViewComponent } from './ngx-calendar-week-view/ngx-calendar-week-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxCalendarWeekViewComponent
  ],
  exports: [
    NgxCalendarWeekViewComponent
  ]
})
export class NgxCalendarWeekModule { }
