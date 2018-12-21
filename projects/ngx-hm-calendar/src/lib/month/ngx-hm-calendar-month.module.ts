import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DIRECTION_ALL } from 'hammerjs';
import { NgxHmCalendarMonthPopupComponent } from './ngx-hm-calendar-month-popup';
import { NgxHmCalendarMonthViewComponent } from './ngx-hm-calendar-month-view';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: DIRECTION_ALL },
  };
}

@NgModule({
  imports: [CommonModule],
  declarations: [NgxHmCalendarMonthViewComponent, NgxHmCalendarMonthPopupComponent],
  exports: [NgxHmCalendarMonthViewComponent],
  entryComponents: [NgxHmCalendarMonthPopupComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
})
export class NgxHmCalendarMonthModule {}
