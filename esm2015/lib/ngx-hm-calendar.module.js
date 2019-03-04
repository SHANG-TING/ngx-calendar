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
export class NgxHmCalendarModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaG0tY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFhN0UsTUFBTSxPQUFPLG1CQUFtQjs7O1lBWC9CLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO29CQUN2QixzQkFBc0I7aUJBQ3ZCO2dCQUNELFlBQVksRUFBRSxDQUFDLHNCQUFzQixDQUFDO2dCQUN0QyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neFJ4TW9kYWxNb2R1bGUgfSBmcm9tICduZ3gtcngtbW9kYWwnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRGF5TW9kdWxlIH0gZnJvbSAnLi9kYXkvbmd4LWhtLWNhbGVuZGFyLWRheS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyTW9udGhNb2R1bGUgfSBmcm9tICcuL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaG0tY2FsZW5kYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuL3dlZWsvbmd4LWhtLWNhbGVuZGFyLXdlZWsubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTmd4UnhNb2RhbE1vZHVsZSxcclxuICAgIE5neEhtQ2FsZW5kYXJNb250aE1vZHVsZSxcclxuICAgIE5neEhtQ2FsZW5kYXJXZWVrTW9kdWxlLFxyXG4gICAgTmd4SG1DYWxlbmRhckRheU1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05neEhtQ2FsZW5kYXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hIbUNhbGVuZGFyQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJNb2R1bGUge31cclxuIl19