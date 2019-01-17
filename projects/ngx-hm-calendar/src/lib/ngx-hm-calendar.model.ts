export interface NgxHmCalendarWeek {
  days: NgxHmCalendarDay[];
  selectedDay?: NgxHmCalendarDay;
  style: any;
}

export interface NgxHmCalendarDay {
  other?: boolean;
  date: Date;
  name?: number;
  number?: number;
  events?: NgxHmCalendarEvent[];
  isToday?: boolean;
}

export interface NgxHmCalendarEventCategory {
  color: string;
  name: string;
}

export interface NgxHmCalendarEvent {
  start: Date;
  end: Date;
  title: string;
  color: string;
  url?: string;
}

export interface NgxHmCalendarElmDetial<T = number> {
  style: {
    top?: T;
    height?: T;
    left?: T;
    width?: T;
    color?: string;
  };
  startsBeforeWeek: boolean;
  endsAfterWeek: boolean;
  title?: string;
  url?: string;
  data: NgxHmCalendarEvent;
}

export interface NgxHmCalendarWeekDay {
  date: Date;
  year: number;
  month: number;
  day: number;
  isToday: boolean;
}

export enum NgxHmCalendarViewMode {
  month = 'month',
  week = 'week',
  day = 'day',
}
