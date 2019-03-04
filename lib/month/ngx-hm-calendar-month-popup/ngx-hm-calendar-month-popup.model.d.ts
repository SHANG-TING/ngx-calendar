import { NgxHmCalendarViewMode } from '../../ngx-hm-calendar.model';
export declare enum CalendarSelectorMode {
    Year = "Year",
    Month = "Month",
    Day = "Day"
}
export interface CalendarSelectorData {
    theme?: string;
    containerViewMode?: NgxHmCalendarViewMode;
}
