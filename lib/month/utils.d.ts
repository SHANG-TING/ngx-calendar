import { NgxHmCalendarEvent, NgxHmCalendarWeek } from '../ngx-hm-calendar.model';
/** 判斷是否為閏年 */
export declare function is_leap(year: any): 1 | 0;
export declare function getCalendar(ynow: number, mnow: number, events: NgxHmCalendarEvent[], weeklyEvents?: NgxHmCalendarEvent[]): Array<NgxHmCalendarWeek>;
export declare function contain(event: NgxHmCalendarEvent, date: Date): boolean;
export declare function getMutipleEvents(ynow: number, mnow: number): (event: NgxHmCalendarEvent) => NgxHmCalendarEvent[];
