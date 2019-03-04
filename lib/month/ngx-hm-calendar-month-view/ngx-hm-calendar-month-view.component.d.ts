import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgxHmCalendarDay, NgxHmCalendarEvent, NgxHmCalendarWeek } from '../../ngx-hm-calendar.model';
export declare class NgxHmCalendarMonthViewComponent implements OnChanges {
    className: string;
    weekNames: string[];
    yearName: string;
    monthName: string;
    weeklyEvents: NgxHmCalendarEvent[];
    events: NgxHmCalendarEvent[];
    nstr: Date;
    open: EventEmitter<any>;
    calendarData: NgxHmCalendarWeek[];
    private eachPresent;
    readonly ynow: number;
    readonly mnow: number;
    readonly dnow: number;
    constructor();
    prev(): void;
    next(): void;
    showEventList(week: NgxHmCalendarWeek, day: NgxHmCalendarDay): void;
    openEvent(event: NgxHmCalendarEvent): void;
    trackByFn(index: any, item: any): any;
    ngOnChanges(changes: SimpleChanges): void;
}
