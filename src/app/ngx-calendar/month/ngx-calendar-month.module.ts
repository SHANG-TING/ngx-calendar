import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DIRECTION_ALL } from 'hammerjs';
import { NgxCalendarMonthPopupComponent } from './ngx-calendar-month-popup/ngx-calendar-month-popup.component';
import { NgxCalendarMonthViewComponent } from './ngx-calendar-month-view/ngx-calendar-month-view.component';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: DIRECTION_ALL },
  };
}

@NgModule({
  imports: [CommonModule],
  declarations: [NgxCalendarMonthViewComponent, NgxCalendarMonthPopupComponent],
  exports: [NgxCalendarMonthViewComponent],
  entryComponents: [NgxCalendarMonthPopupComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
})
export class NgxCalendarMonthModule {}
