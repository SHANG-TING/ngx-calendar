/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DIRECTION_ALL } from 'hammerjs';
import { NgxHmCalendarMonthViewComponent } from './ngx-hm-calendar-month-view/ngx-hm-calendar-month-view.component';
import { NgxHmCalendarMonthPopupComponent } from './ngx-hm-calendar-month-popup/ngx-hm-calendar-month-popup.component';
export class HammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = (/** @type {?} */ ({
            swipe: { direction: DIRECTION_ALL },
        }));
    }
}
if (false) {
    /** @type {?} */
    HammerConfig.prototype.overrides;
}
export class NgxHmCalendarMonthModule {
}
NgxHmCalendarMonthModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLW1vbnRoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBRXZILE1BQU0sT0FBTyxZQUFhLFNBQVEsbUJBQW1CO0lBQXJEOztRQUNFLGNBQVMsR0FBRyxtQkFBSztZQUNmLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUU7U0FDcEMsRUFBQSxDQUFDO0lBQ0osQ0FBQztDQUFBOzs7SUFIQyxpQ0FFRTs7QUFlSixNQUFNLE9BQU8sd0JBQXdCOzs7WUFacEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsK0JBQStCLEVBQUUsZ0NBQWdDLENBQUM7Z0JBQ2pGLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO2dCQUMxQyxlQUFlLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDbkQsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLFFBQVEsRUFBRSxZQUFZO3FCQUN2QjtpQkFDRjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGFtbWVyR2VzdHVyZUNvbmZpZywgSEFNTUVSX0dFU1RVUkVfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IERJUkVDVElPTl9BTEwgfSBmcm9tICdoYW1tZXJqcyc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci1tb250aC12aWV3L25neC1obS1jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XHJcbiAgb3ZlcnJpZGVzID0gPGFueT57XHJcbiAgICBzd2lwZTogeyBkaXJlY3Rpb246IERJUkVDVElPTl9BTEwgfSxcclxuICB9O1xyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW05neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQsIE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmd4SG1DYWxlbmRhck1vbnRoUG9wdXBDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsXHJcbiAgICAgIHVzZUNsYXNzOiBIYW1tZXJDb25maWcsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyTW9udGhNb2R1bGUgeyB9XHJcbiJdfQ==