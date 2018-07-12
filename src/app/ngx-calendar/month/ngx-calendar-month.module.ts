import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarMonthViewComponent } from './ngx-calendar-month-view';
import { NgxCalendarMonthPopupComponent } from './ngx-calendar-month-popup';
import { PopUpModule } from '../@core/components';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

  export class HammerConfig extends HammerGestureConfig {
    overrides = <any>{
      'swipe': { direction: Hammer.DIRECTION_ALL }
    };
  }

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
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCalendarMonthModule { }
