import { ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { NgxRxModalService } from 'ngx-rx-modal';
import { NgxHmCalendarEvent, NgxHmCalendarEventCategory, NgxHmCalendarViewMode } from './ngx-hm-calendar.model';
export declare class NgxHmCalendarComponent {
    private _model;
    private _factory;
    weekNames: string[];
    yearName: string;
    monthName: string;
    dayName: string;
    eventCategorys: NgxHmCalendarEventCategory[];
    weeklyEvents: NgxHmCalendarEvent[];
    events: NgxHmCalendarEvent[];
    nstr: Date;
    open: EventEmitter<any>;
    className: string;
    size: {
        width: string;
        height: string;
    };
    /**
     * 顯示模式
     */
    viewMode: NgxHmCalendarViewMode;
    readonly ynow: number;
    readonly mnow: number;
    readonly dnow: number;
    readonly monDetail: string;
    legendOpen: string;
    private monthComponent;
    private weekComponent;
    private dayComponent;
    private monthPopupComponent;
    constructor(_model: NgxRxModalService, _factory: ComponentFactoryResolver);
    prev(): void;
    next(): void;
    openEvent(event: NgxHmCalendarEvent): void;
    openSelector($event: MouseEvent): void;
    chaneMode(mode: any): void;
    legendToggle(): void;
}
