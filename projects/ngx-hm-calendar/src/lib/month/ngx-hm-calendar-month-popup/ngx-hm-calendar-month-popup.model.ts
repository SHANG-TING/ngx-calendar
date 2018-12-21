import { CalendarViewMode } from '../../ngx-hm-calendar.model';

export enum CalendarSelectorMode {
  Year = 'Year',
  Month = 'Month',
  Day = 'Day',
}

export interface CalendarSelectorData {
  theme?: string;
  containerViewMode?: CalendarViewMode;
}
