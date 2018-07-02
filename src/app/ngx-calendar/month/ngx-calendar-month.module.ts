import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarMonthViewComponent } from './ngx-calendar-month-view';
import { NgxCalendarMonthPopupComponent } from './ngx-calendar-month-popup';
import { PopUpModule } from '../@core/components';

const COMPONENTS = [
  NgxCalendarMonthViewComponent
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
export class NgxCalendarMonthModule { }
