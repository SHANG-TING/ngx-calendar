import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxHmCalendarElmDetial, NgxHmCalendarEvent, NgxHmCalendarWeekDay } from '../../ngx-hm-calendar.model';
export declare class NgxHmCalendarWeekViewComponent implements OnInit, OnChanges {
    className: string;
    dayName: string;
    weekNames: string[];
    weeklyEvents: NgxHmCalendarEvent[];
    events: NgxHmCalendarEvent[];
    nstr: Date;
    open: EventEmitter<any>;
    weekDays: NgxHmCalendarWeekDay[];
    weekEvents: NgxHmCalendarElmDetial<string>[];
    constructor();
    ngOnInit(): void;
    private initValue;
    setWeekDays(): void;
    setWeekEvents(): void;
    prev(): void;
    next(): void;
    openEvent(event: any): void;
    ngOnChanges(changes: SimpleChanges): void;
}
