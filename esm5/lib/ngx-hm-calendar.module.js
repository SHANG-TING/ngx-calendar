/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxRxModalModule } from 'ngx-rx-modal';
import { NgxHmCalendarDayModule } from './day/ngx-hm-calendar-day.module';
import { NgxHmCalendarMonthModule } from './month/ngx-hm-calendar-month.module';
import { NgxHmCalendarComponent } from './ngx-hm-calendar.component';
import { NgxHmCalendarWeekModule } from './week/ngx-hm-calendar-week.module';
var NgxHmCalendarModule = /** @class */ (function () {
    function NgxHmCalendarModule() {
    }
    NgxHmCalendarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgxRxModalModule,
                        NgxHmCalendarMonthModule,
                        NgxHmCalendarWeekModule,
                        NgxHmCalendarDayModule,
                    ],
                    declarations: [NgxHmCalendarComponent],
                    exports: [NgxHmCalendarComponent],
                },] }
    ];
    return NgxHmCalendarModule;
}());
export { NgxHmCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaG0tY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFN0U7SUFBQTtJQVdrQyxDQUFDOztnQkFYbEMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsd0JBQXdCO3dCQUN4Qix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNsQzs7SUFDaUMsMEJBQUM7Q0FBQSxBQVhuQyxJQVdtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hSeE1vZGFsTW9kdWxlIH0gZnJvbSAnbmd4LXJ4LW1vZGFsJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckRheU1vZHVsZSB9IGZyb20gJy4vZGF5L25neC1obS1jYWxlbmRhci1kYXkubW9kdWxlJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoTW9kdWxlIH0gZnJvbSAnLi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgubW9kdWxlJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi93ZWVrL25neC1obS1jYWxlbmRhci13ZWVrLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5neFJ4TW9kYWxNb2R1bGUsXHJcbiAgICBOZ3hIbUNhbGVuZGFyTW9udGhNb2R1bGUsXHJcbiAgICBOZ3hIbUNhbGVuZGFyV2Vla01vZHVsZSxcclxuICAgIE5neEhtQ2FsZW5kYXJEYXlNb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hIbUNhbGVuZGFyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmd4SG1DYWxlbmRhckNvbXBvbmVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyTW9kdWxlIHt9XHJcbiJdfQ==