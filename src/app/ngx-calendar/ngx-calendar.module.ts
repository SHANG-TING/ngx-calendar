import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarComponent } from './ngx-calendar.component';
import { PopUpModule } from './@core/components';
import { NgxCalendarWeekComponent } from './week';
import { NgxCalendarMonthPopupComponent } from './month/ngx-calendar-month-popup/ngx-calendar-month-popup.component';

const COMPONENTS = [
  NgxCalendarComponent,
  NgxCalendarWeekComponent
];

const POPUP_COMPONENTS = [
  NgxCalendarMonthPopupComponent
];

@NgModule({
  imports: [
    CommonModule,
    PopUpModule
  ],
  declarations: [COMPONENTS, POPUP_COMPONENTS],
  exports: [COMPONENTS],
  entryComponents: [
    POPUP_COMPONENTS
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCalendarModule { }
