import { AfterViewInit, ElementRef, EventEmitter, OnChanges, QueryList, SimpleChanges } from '@angular/core';
import { NgxHmCalendarElmDetial, NgxHmCalendarEvent } from '../../ngx-hm-calendar.model';
export declare class NgxHmCalendarDayViewComponent implements AfterViewInit, OnChanges {
    className: string;
    weeklyEvents: NgxHmCalendarEvent[];
    events: NgxHmCalendarEvent[];
    nstr: Date;
    start: string;
    end: string;
    split: number;
    open: EventEmitter<any>;
    elmWidth: number;
    bars: QueryList<ElementRef>;
    readonly firstDate: Date;
    readonly lastDate: Date;
    dayEvents: NgxHmCalendarElmDetial<string>[];
    hourSchemas: any[];
    constructor();
    ngAfterViewInit(): void;
    initView(): void;
    setHourSchemas(): void;
    setDayEvent(): void;
    bindDayEventWidth(): void;
    prev(): void;
    next(): void;
    openEvent(event: any): void;
    ngOnChanges(changes: SimpleChanges): void;
}
