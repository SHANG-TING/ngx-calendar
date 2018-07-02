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

export interface CalendarEvent {
  start: Date;
  end?: Date;
  title: string;
  color: colors;
  url: string;
}

export interface CalendarWeekDay {
  date: Date;
  year: number;
  month: number;
  day: number;
  isToday: boolean;
}

export enum colors {
  orange = 'orange',
  green = 'green',
  blue = 'blue',
  yellow = 'yellow'
}

export enum CalendarViewMode {
  month = 'month',
  week = 'week',
  day = 'day'
}
