/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DIRECTION_ALL } from 'hammerjs';
import { NgxHmCalendarMonthViewComponent } from './ngx-hm-calendar-month-view/ngx-hm-calendar-month-view.component';
import { NgxHmCalendarMonthPopupComponent } from './ngx-hm-calendar-month-popup/ngx-hm-calendar-month-popup.component';
var HammerConfig = /** @class */ (function (_super) {
    tslib_1.__extends(HammerConfig, _super);
    function HammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = (/** @type {?} */ ({
            swipe: { direction: DIRECTION_ALL },
        }));
        return _this;
    }
    return HammerConfig;
}(HammerGestureConfig));
export { HammerConfig };
if (false) {
    /** @type {?} */
    HammerConfig.prototype.overrides;
}
var NgxHmCalendarMonthModule = /** @class */ (function () {
    function NgxHmCalendarMonthModule() {
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
    return NgxHmCalendarMonthModule;
}());
export { NgxHmCalendarMonthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLW1vbnRoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUV2SDtJQUFrQyx3Q0FBbUI7SUFBckQ7UUFBQSxxRUFJQztRQUhDLGVBQVMsR0FBRyxtQkFBSztZQUNmLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUU7U0FDcEMsRUFBQSxDQUFDOztJQUNKLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFKRCxDQUFrQyxtQkFBbUIsR0FJcEQ7Ozs7SUFIQyxpQ0FFRTs7QUFHSjtJQUFBO0lBWXdDLENBQUM7O2dCQVp4QyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxnQ0FBZ0MsQ0FBQztvQkFDakYsT0FBTyxFQUFFLENBQUMsK0JBQStCLENBQUM7b0JBQzFDLGVBQWUsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUNuRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsUUFBUSxFQUFFLFlBQVk7eUJBQ3ZCO3FCQUNGO2lCQUNGOztJQUN1QywrQkFBQztDQUFBLEFBWnpDLElBWXlDO1NBQTVCLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhhbW1lckdlc3R1cmVDb25maWcsIEhBTU1FUl9HRVNUVVJFX0NPTkZJRyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBESVJFQ1RJT05fQUxMIH0gZnJvbSAnaGFtbWVyanMnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhhbW1lckNvbmZpZyBleHRlbmRzIEhhbW1lckdlc3R1cmVDb25maWcge1xyXG4gIG92ZXJyaWRlcyA9IDxhbnk+e1xyXG4gICAgc3dpcGU6IHsgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMIH0sXHJcbiAgfTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LCBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW05neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnRdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW05neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogSEFNTUVSX0dFU1RVUkVfQ09ORklHLFxyXG4gICAgICB1c2VDbGFzczogSGFtbWVyQ29uZmlnLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhck1vbnRoTW9kdWxlIHsgfVxyXG4iXX0=