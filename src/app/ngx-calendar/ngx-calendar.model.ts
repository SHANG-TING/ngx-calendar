export interface CalendarWeek {
  days: CalendarDay[];
  selectedDay?: CalendarDay;
  style: any;
}

export interface CalendarDay {
  other?: boolean;
  date: Date;
  name?: number;
  number?: number;
  events?: CalendarEvent[];
  isToday?: boolean;
}

export interface CalendarEventCategory {
  color: string;
  name: string;
}

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  color: string;
  url?: string;
}

export interface CalendarElmDetial<T = number> {
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
  data: CalendarEvent;
}

export interface CalendarWeekDay {
  date: Date;
  year: number;
  month: number;
  day: number;
  isToday: boolean;
}

export enum CalendarViewMode {
  month = 'month',
  week = 'week',
  day = 'day',
}
