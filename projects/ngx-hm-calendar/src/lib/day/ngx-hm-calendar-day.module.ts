import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxHmCalendarDayViewComponent } from './ngx-hm-calendar-day-view/ngx-hm-calendar-day-view.component';

const COMPONENTS = [NgxHmCalendarDayViewComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgxHmCalendarDayModule {}
