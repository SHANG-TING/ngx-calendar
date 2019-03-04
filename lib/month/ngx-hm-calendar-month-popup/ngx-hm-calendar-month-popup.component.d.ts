import { OnInit } from '@angular/core';
import { NgxRxModalRef } from 'ngx-rx-modal';
import { Subject } from 'rxjs';
import { CalendarSelectorData, CalendarSelectorMode } from './ngx-hm-calendar-month-popup.model';
export declare class NgxHmCalendarMonthPopupComponent implements OnInit, NgxRxModalRef {
    private data;
    popupData: CalendarSelectorData;
    mode: CalendarSelectorMode;
    minYear: number;
    selectedYear: number;
    selectedMonth: number;
    selectedDate: Date;
    calendarData: any;
    months: number[];
    readonly years: number[];
    complete: Subject<{}>;
    constructor(data: any);
    ngOnInit(): void;
    prevYearRange(): void;
    nextYearRange(): void;
    selectYear(year: any): void;
    selectMonth(month: any): void;
    selectDay(day: any): void;
    backToYearSelector(): void;
    backToMonthSelector(): void;
}
